import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendTest = async () => {
  try {
    await sgMail.send({
      to: process.env.EMAIL_USER,
      from: process.env.EMAIL_USER,
      subject: "SendGrid Test Email",
      text: "This is a test email",
    });
    console.log("✅ Email sent successfully!");
  } catch (err) {
    console.error(err.response?.body || err);
  }
};

sendTest();
