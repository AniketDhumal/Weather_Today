import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function Home() {
  const [city, setCity] = useState("Nagpur");
  const [coords, setCoords] = useState({ lat: 21.1458, lon: 79.0882 });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!coords.lat || !coords.lon) return;

    const fetchWeather = async () => {
      try {
        setStatus(`Fetching weather for ${city}...`);
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`
        );
        const data = await res.json();

        if (!data.current_weather) throw new Error("No weather data found");

        setWeather({
          temp: data.current_weather.temperature,
          wind: data.current_weather.windspeed,
          humidity: data.hourly?.relativehumidity_2m?.[0] ?? "N/A",
        });

        const formatted = data.daily.time.map((day, idx) => ({
          date: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
          tempMax: data.daily.temperature_2m_max[idx],
          tempMin: data.daily.temperature_2m_min[idx],
          wind: data.daily.windspeed_10m_max[idx],
          rain: data.daily.precipitation_sum[idx],
        }));
        setForecast(formatted);

        setStatus("");
      } catch (err) {
        setStatus(`❌ ${err.message}`);
      }
    };

    fetchWeather();
  }, [coords, city]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setStatus(`Searching ${city}...`);
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        setStatus("❌ City not found");
        return;
      }
      const place = data.results[0];
      setCoords({ lat: place.latitude, lon: place.longitude });
      setCity(place.name);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-200 via-sky-400 to-sky-600 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-gray-100">
      <main className="flex-grow max-w-6xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-5xl font-extrabold mb-10 text-center tracking-wide drop-shadow-md">
          🌍 Weather Now
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center gap-3 mb-12"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="px-5 py-3 border rounded-2xl w-72 dark:bg-gray-800/50 dark:border-gray-600 shadow-lg backdrop-blur-md focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-sky-700 transition transform hover:scale-105"
          >
            🔍 Search
          </button>
        </form>

        {/* Status */}
        {status && (
          <p className="text-center mb-6 text-sm text-gray-700 dark:text-gray-400">
            {status}
          </p>
        )}

        {/* Current Weather Widget */}
        {weather && (
          <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl mb-12 text-center transition transform hover:scale-[1.02]">
            <h2 className="text-3xl font-bold mb-2">{city}</h2>
            <p className="text-7xl font-extrabold mb-4 drop-shadow-sm">
              {weather.temp}°C
            </p>
            <div className="flex justify-center gap-10 text-lg font-medium">
              <p>💧 {weather.humidity}%</p>
              <p>💨 {weather.wind} km/h</p>
            </div>
          </div>
        )}

        {/* Forecast Grid */}
        {forecast.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center">7-Day Forecast</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6">
              {forecast.map((f, idx) => (
                <div
                  key={idx}
                  className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center hover:scale-105 hover:shadow-xl transition transform"
                >
                  <p className="font-semibold text-lg">{f.date}</p>
                  <p className="text-3xl my-2">🌤️</p>
                  <p className="font-bold text-lg">
                    {f.tempMax}° / {f.tempMin}°
                  </p>
                  <p className="text-sm mt-1">💨 {f.wind} km/h</p>
                  <p className="text-sm">🌧 {f.rain} mm</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
