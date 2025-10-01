import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    );
    const geoData = await geoRes.json();

    if (!geoData.results?.length) {
      return res.status(404).json({ error: "City not found" });
    }

    const g = geoData.results[0];
    res.json({
      name: g.name,
      country: g.country_code || g.country,
      latitude: g.latitude,
      longitude: g.longitude,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

export default router;
