
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import weatherRoutes from "./routes/weather.js";
import favoriteRoutes from "./routes/favorites.js";
import messageRoutes from "./routes/messages.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/", (_req, res) => {
  res.send("🌤️ Weather API backend is running.");
});

app.use("/api/weather", weatherRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/messages", messageRoutes);

app.use((err, _req, res, _next) => {
  console.error("❌ Server Error:", err?.stack || err);
  res.status(500).json({ error: "Something went wrong!" });
});

// Connect DB (example — keep or replace with your existing connect logic)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
} else {
  console.warn("⚠️ MONGO_URI not set; skipping DB connect.");
}

export default app;

// --------- IMPORTANT: always listen on process.env.PORT ----------
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server listening on ${HOST}:${PORT} (NODE_ENV=${process.env.NODE_ENV || "undefined"})`);
});

