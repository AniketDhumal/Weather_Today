import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import weatherRoutes from "./routes/weather.js";
import favoriteRoutes from "./routes/favorites.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://weather-r3uf.vercel.app",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS not allowed"), false);
      }
      return callback(null, true);
    },
  })
);

app.use("/api/weather", weatherRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/messages", messageRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
}
