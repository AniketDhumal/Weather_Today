import express from "express";
import City from "../models/City.js";

const router = express.Router();

// Add city with forecast
router.post("/", async (req, res) => {
  try {
    const city = new City(req.body); // {name, country, forecasts:[...]}
    await city.save();
    res.status(201).json(city);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all favorite cities
router.get("/", async (req, res) => {
  const cities = await City.find();
  res.json(cities);
});

// Get one city by ID
router.get("/:id", async (req, res) => {
  const city = await City.findById(req.params.id);
  res.json(city);
});

// Update city forecast
router.put("/:id", async (req, res) => {
  try {
    const updated = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete city
router.delete("/:id", async (req, res) => {
  await City.findByIdAndDelete(req.params.id);
  res.json({ message: "City removed" });
});

export default router;
