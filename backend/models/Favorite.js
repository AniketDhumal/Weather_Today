import mongoose from "mongoose";

// Each forecast entry (day, temperature, humidity, wind, icon)
const ForecastSchema = new mongoose.Schema({
  day: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  wind: { type: Number, required: true },
  icon: { type: String, default: "☀️" },
},{ _id: true });

// Favorite city with multiple forecasts
const FavoriteSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  forecasts: [ForecastSchema], // ✅ store weather data here
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Favorite", FavoriteSchema);
