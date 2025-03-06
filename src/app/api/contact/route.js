import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";
import { rateLimit } from "@/lib/rateLimiter";

// Constants for error messages
const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid request data",
  SERVER_ERROR: "An error occurred. Please try again later.",
};

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
        { error: ERROR_MESSAGES.BAD_REQUEST },
        { status: 400 }
      );
    }

    // Send email with form data
    await sendEmail({ name, email, message });

    // Return success response
    return NextResponse.json(
      { message: "Message sent successfully to Behabtu!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}

// Optional: Handle other methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
