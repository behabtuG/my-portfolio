import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail({ name, email, message, sentAt }) {
  const mailOptions = {
    from: `Behabtu's Portfolio <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: "Message Sent from Your Portfolio",
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
      Sent At: ${sentAt}
      From Behabtu Getnet Walle's Portfolio
    `,
    html: `
      <h1>Message Sent from Your Portfolio</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Sent At:</strong> ${sentAt}</p>
      <p>From Behabtu Getnet Walle's Portfolio</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
