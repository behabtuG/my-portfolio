import nodemailer from "nodemailer";

// Constants for configuration
const EMAIL_CONFIG = {
  SERVICE: "gmail",
  AUTH: {
    USER: process.env.EMAIL_USER,
    PASS: process.env.EMAIL_PASSWORD,
  },
};

// Initialize transporter once (singleton pattern)
const transporter = nodemailer.createTransport({
  service: EMAIL_CONFIG.SERVICE,
  auth: {
    user: EMAIL_CONFIG.AUTH.USER,
    pass: EMAIL_CONFIG.AUTH.PASS,
  },
  pool: true, // Enable connection pooling for performance
  maxConnections: 5, // Limit concurrent connections
  maxMessages: 100, // Limit messages per connection
});

// Verify transporter on startup (optional, for debugging)
transporter.verify((error) => {
  if (error) {
    console.error("Nodemailer verification failed:", error);
  } else {
    console.log("Nodemailer ready to send emails");
  }
});

export async function sendEmail({ name, email, message }) {
  // Input validation
  if (!name || !email || !message) {
    throw new Error("Missing required fields: name, email, or message");
  }

  // Sanitize inputs (basic example, consider a library like sanitize-html for more robustness)
  const sanitizedName = name.trim();
  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedMessage = message.trim();

  // Email options with enhanced formatting
  const mailOptions = {
    from: `"Behabtu's Portfolio" <${EMAIL_CONFIG.AUTH.USER}>`, // Formatted sender
    to: process.env.EMAIL_RECEIVER,
    replyTo: sanitizedEmail, // Allow replies to go to sender
    subject: "Message Sent from Your Portfolio - Behabtu Getnet Walle",
    text: `
      Name: ${sanitizedName}
      Email: ${sanitizedEmail}
      Message: ${sanitizedMessage}
      Sent At: ${new Date().toISOString()}
    `,
    html: `
      <h2>Message Sent from Your Portfolio</h2>
      <p><strong>Name:</strong> ${sanitizedName}</p>
      <p><strong>Email:</strong> ${sanitizedEmail}</p>
      <p><strong>Message:</strong> ${sanitizedMessage}</p>
      <p><strong>Sent At:</strong> ${new Date().toISOString()}</p>
      <footer>From Behabtu Getnet Walle's Portfolio</footer>
    `, // HTML version for better email clients
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error; // Propagate error to caller
  }
}

// Export transporter for testing or advanced use cases (optional)
export { transporter };
