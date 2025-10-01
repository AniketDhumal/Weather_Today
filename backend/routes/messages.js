import express from "express";
import Message from "../models/Message.js";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

// POST new message (contact form)
router.post("/", async (req, res) => {
  try {
    const { name, email: visitorEmail, message } = req.body;

    // 1️⃣ Save message to MongoDB
    const msg = new Message({ name, email: visitorEmail, message });
    await msg.save();

    // 2️⃣ Email to website owner
    const ownerMail = {
      to: process.env.OWNER_EMAIL,       // Owner's email
      from: process.env.EMAIL_USER,      // VERIFIED SendGrid email
      replyTo: visitorEmail,             // Visitor's email
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${visitorEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 3️⃣ Thank-you email to visitor
    const visitorMail = {
      to: visitorEmail,
      from: process.env.EMAIL_USER,      // VERIFIED SendGrid email
      subject: "Thank you for your feedback! 🌟",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting WeatherNow. We have received your message and will get back to you soon.</p>
        <p>Best regards,<br/>Aniket Dhumal<br/>WeatherNow Team</p>
      `,
    };

    // 4️⃣ Send both emails
    await sgMail.send(ownerMail);
    await sgMail.send(visitorMail);

    res.status(201).json({ message: "Message sent and emails delivered!", data: msg });
  } catch (err) {
    console.error(err.response?.body || err);
    res.status(400).json({ error: err.message });
  }
});

// GET all messages (admin view)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
