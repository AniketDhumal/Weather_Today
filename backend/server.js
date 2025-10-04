
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import weatherRoutes from "./routes/weather.js";
import favoriteRoutes from "./routes/favorites.js";
import messageRoutes from "./routes/messages.js";

const app = express();

app.use(cors()); // you can restrict origins by replacing with cors({ origin: [...] })
app.use(express.json());

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/messages", messageRoutes);

// Simple error handler
app.use((err, _req, res, _next) => {
  console.error("❌ Server Error:", err?.stack || err);
  res.status(500).json({ error: "Something went wrong!" });
});

// MongoDB connect (simple & robust)
const uri = process.env.MONGO_URI || "";
if (!uri) {
  console.warn("⚠️  MONGO_URI not set — set process.env.MONGO_URI before starting the server.");
} else {
  const mask = (s = "") => (s.length > 40 ? s.slice(0, 12) + "…[masked]…" + s.slice(-12) : s);
  console.log("Connecting to MongoDB (masked):", mask(uri));
  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection failed:", err));
}

// Export app for serverless platforms (Vercel, etc.)
export default app;

// Start server when running as a normal Node process (Render / local)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
