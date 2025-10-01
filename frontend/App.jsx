import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import Home from "./src/pages/Home";
import Forecast from "./src/components/Forecast";
import Favorites from "./src/pages/Favorites";
import Contact from "./src/pages/Contact";
import About from "./src/pages/About";


export default function App() {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("c"); // c or f
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [place, setPlace] = useState(null);
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recentCities")) || [];
    } catch {
      return [];
    }
  });

  // ✅ Fetch weather by city
  const handleSearch = async (query) => {
    const searchQuery = (query || city).trim();
    if (!searchQuery) return;

    setLoading(true);
    setError("");
    setPlace(null);
    setCurrent(null);
    setDaily(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchQuery
        )}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();
      if (!geoData?.results?.length) throw new Error("City not found");
      const g = geoData.results[0];
      const location = {
        name: g.name,
        country: g.country_code || g.country,
        latitude: g.latitude,
        longitude: g.longitude,
      };
      setPlace(location);

      const params = new URLSearchParams({
        latitude: location.latitude,
        longitude: location.longitude,
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code",
        daily:
          "temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,weather_code",
        timezone: "auto",
      });
      const wxRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`
      );
      const data = await wxRes.json();

      setCurrent(data.current);
      setDaily(data.daily);

      setRecent((prev) => [
        { key: `${location.name}, ${location.country}`, q: searchQuery },
        ...prev.filter((r) => r.q.toLowerCase() !== searchQuery.toLowerCase()),
      ]);
      localStorage.setItem(
        "recentCities",
        JSON.stringify(
          [{ key: `${location.name}, ${location.country}`, q: searchQuery }].concat(
            recent.filter((r) => r.q.toLowerCase() !== searchQuery.toLowerCase())
          )
        )
      );
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch weather by GPS
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const revRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`
          );
          const revData = await revRes.json();
          const name = revData?.results?.[0]?.name || "My Location";
          const country = revData?.results?.[0]?.country_code || "";

          setPlace({ name, country, latitude, longitude });

          const params = new URLSearchParams({
            latitude,
            longitude,
            current:
              "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code",
            daily:
              "temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,weather_code",
            timezone: "auto",
          });
          const wxRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?${params.toString()}`
          );
          const data = await wxRes.json();

          setCurrent(data.current);
          setDaily(data.daily);
        } catch {
          setError("Failed to fetch weather for location");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied.");
        setLoading(false);
      }
    );
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
        <Navbar
          unit={unit}
          setUnit={setUnit}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                city={city}
                setCity={setCity}
                onSearch={handleSearch}
                useMyLocation={useMyLocation}
                loading={loading}
                error={error}
                recent={recent}
                place={place}
                current={current}
                daily={daily}
                unit={unit}
              />
            }
          />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}
