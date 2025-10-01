import mongoose from "mongoose";

const ForecastSchema = new mongoose.Schema({
  day: String,
  temp: String,
  humidity: String,
  wind: String,
  icon: String,
});

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  country: String,
  forecasts: [ForecastSchema], // 7-day forecast
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("City", CitySchema);
