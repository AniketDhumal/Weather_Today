import express from "express";
import mongoose from "mongoose";
import Favorite from "../models/Favorite.js";

const router = express.Router();

// 📌 Get all favorites
router.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ error: "Server error while fetching favorites" });
  }
});

// ➕ Add city
router.post("/", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const fav = new Favorite({
      city: req.body.city?.trim() || "Unknown City",
      country: req.body.country?.trim() || "Unknown Country",
      forecasts: [],
    });

    await fav.save();
    res.status(201).json(fav);
  } catch (err) {
    console.error("Error adding city:", err);
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete city
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid cityId" });
    }

    const deleted = await Favorite.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "City not found" });
    }

    res.json({ message: "City deleted", id: req.params.id });
  } catch (err) {
    console.error("Error deleting city:", err);
    res.status(500).json({ error: "Server error while deleting city" });
  }
});

// ➕ Add forecast
router.post("/:id/forecast", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid cityId" });
    }

    const fav = await Favorite.findById(req.params.id);
    if (!fav) return res.status(404).json({ error: "City not found" });

    fav.forecasts.push(req.body);
    await fav.save();

    res.json(fav);
  } catch (err) {
    console.error("Error adding forecast:", err);
    res.status(400).json({ error: err.message });
  }
});

// ✏️ Update forecast
router.put("/:id/forecast/:forecastId", async (req, res) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.id) ||
      !mongoose.Types.ObjectId.isValid(req.params.forecastId)
    ) {
      return res.status(400).json({ error: "Invalid cityId or forecastId" });
    }

    const fav = await Favorite.findById(req.params.id);
    if (!fav) return res.status(404).json({ error: "City not found" });

    const forecast = fav.forecasts.id(req.params.forecastId);
    if (!forecast) return res.status(404).json({ error: "Forecast not found" });

    forecast.set(req.body);
    await fav.save();

    res.json(fav);
  } catch (err) {
    console.error("Error updating forecast:", err);
    res.status(500).json({ error: "Server error while updating forecast" });
  }
});

router.delete("/:id/forecast/:forecastId", async (req, res) => {
  try {
    const { id, forecastId } = req.params;

    // Validate city id only (optional)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid cityId" });
    }

    const updated = await Favorite.findByIdAndUpdate(
      id,
      { $pull: { forecasts: { _id: forecastId } } }, // works for ObjectId or string
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "City not found" });

    return res.json(updated);
  } catch (err) {
    console.error("Error deleting forecast:", err);
    return res.status(500).json({ error: "Server error while deleting forecast" });
  }
});


export default router;
