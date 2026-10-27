import nodemailer from "nodemailer";

/**
 * Sends an email using whichever provider is configured:
 *
 *  1. Brevo HTTP API   (BREVO_API_KEY + EMAIL)  <- recommended for Render free tier,
 *     because Render blocks outbound SMTP ports (465/587) on free web services.
 *  2. SMTP / Gmail     (EMAIL + EMAIL_PASS)     <- fine for local development.
 */
let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_PORT || "465") === "465",
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
    });
  }
  return transporter;
};

async function sendEmail({ to, subject, text = "", html = "" }) {
  const fromName = process.env.EMAIL_FROM_NAME || "Spices Gold";
  // Local development without an email provider: print the message in the server terminal
  // so you can copy the verification code from there.
  if (process.env.NODE_ENV !== "production" && !process.env.BREVO_API_KEY && !process.env.EMAIL_PASS) {
    console.log(`\n📧 [DEV EMAIL - not really sent] To: ${to}\n   Subject: ${subject}\n   ${text || "(see html)"}\n`);
    return { success: true, dev: true };
  }
  try {
    if (process.env.BREVO_API_KEY) {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          sender: { name: fromName, email: process.env.EMAIL },
          to: [{ email: to }],
          subject,
          htmlContent: html || `<p>${text}</p>`,
        }),
      });
      if (!res.ok) throw new Error(`Brevo responded ${res.status}: ${await res.text()}`);
      return { success: true };
    }

    const info = await getTransporter().sendMail({
      from: `"${fromName}" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error.message);
    return { success: false, error: error.message };
  }
}

export default sendEmail;
