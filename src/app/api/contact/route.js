import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";

// Rate-limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per windowMs
const rateLimitMap = new Map(); // Store IP addresses and their request counts

// Helper function to extract the client's IP address
function extractClientIp(request) {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim(); // Get the first IP in the list
  }
  return request.ip || "127.0.0.1"; // Fallback to request IP or localhost
}

// Rate-limiting middleware
function rateLimit(request) {
  const clientIp = extractClientIp(request);

  // Initialize or update the request count for the client IP
  const currentTime = Date.now();
  const clientData = rateLimitMap.get(clientIp) || {
    count: 0,
    lastRequestTime: currentTime,
  };

  // Reset the count if the window has passed
  if (currentTime - clientData.lastRequestTime > RATE_LIMIT_WINDOW_MS) {
    clientData.count = 0;
    clientData.lastRequestTime = currentTime;
  }

  // Increment the request count
  clientData.count += 1;
  rateLimitMap.set(clientIp, clientData);

  // Check if the client has exceeded the rate limit
  if (clientData.count > RATE_LIMIT_MAX_REQUESTS) {
    return {
      error: "Too many requests. Please try again later.",
      status: 429,
    };
  }

  return null; // No rate limit exceeded
}

export async function POST(request) {
  try {
    // Apply rate limiting
    const rateLimitResponse = rateLimit(request);
    if (rateLimitResponse) {
      return NextResponse.json(
        { error: rateLimitResponse.error },
        { status: rateLimitResponse.status }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Generate a correctly formatted timestamp
    const sentAt = new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Send email with form data
    await sendEmail({
      name,
      email,
      message,
      sentAt, // Include the corrected timestamp
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
