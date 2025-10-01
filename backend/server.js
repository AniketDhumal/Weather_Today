import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import weatherRoutes from "./routes/weather.js";
import favoriteRoutes from "./routes/favorites.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/messages", messageRoutes);
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});


// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// MongoDB connection (only once)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ✅ Export app (for Vercel)
export default app;

// ✅ Local development mode (only runs if not in Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
}

