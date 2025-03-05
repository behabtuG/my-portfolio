import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";

// Constants for error messages
const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid request data",
  RECAPTCHA_FAILED: "reCAPTCHA verification failed",
  SERVER_ERROR: "An error occurred. Please try again later.",
};

/**
 * Handles POST requests to send contact form emails
 * @param {Request} request - Next.js request object
 * @returns {Promise<NextResponse>} - Response with success or error
 */
export async function POST(request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { name, email, message, captcha } = body;

    if (!name || !email || !message || !captcha) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.BAD_REQUEST },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
    const recaptchaResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.warn("reCAPTCHA verification failed:", recaptchaData);
      return NextResponse.json(
        { error: ERROR_MESSAGES.RECAPTCHA_FAILED, details: recaptchaData },
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
