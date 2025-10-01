import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

export default function Forecast() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=21.1458&longitude=79.0882&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto"
        );
        const data = await res.json();

        if (!data.daily) return;

        const formatted = data.daily.time.map((day, idx) => ({
          date: new Date(day).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          tempMax: data.daily.temperature_2m_max[idx],
          tempMin: data.daily.temperature_2m_min[idx],
          wind: data.daily.windspeed_10m_max[idx],
          rain: data.daily.precipitation_sum[idx],
        }));

        setForecast(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, []);

  // Dynamic gradient background based on max temp
  const getBg = (temp) => {
    if (temp < 20) return "from-blue-400/70 to-blue-600/80";
    if (temp < 30) return "from-green-400/70 to-green-600/80";
    return "from-orange-400/70 to-red-600/80";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 via-sky-200 to-sky-300 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-gray-100">
      <main className="flex-grow p-6 text-center max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 tracking-wide drop-shadow-md">
          7-Day Forecast – Nagpur 🌍
        </h2>

        {loading && <p className="text-gray-500">Loading forecast...</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6">
          {forecast.map((d, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl shadow-2xl p-6 text-white bg-gradient-to-br ${getBg(
                d.tempMax
              )} backdrop-blur-lg hover:scale-105 hover:shadow-[0_0_25px_rgba(0,0,0,0.25)] transition transform flex flex-col justify-between`}
            >
              {/* Date */}
              <p className="font-semibold text-lg">{d.date}</p>

              {/* Temperature */}
              <p className="text-3xl font-bold my-2">🌡️ {d.tempMin}° / {d.tempMax}°</p>

              {/* Extra info */}
              <div className="flex flex-col gap-1 text-sm mt-2">
                <p>💨 Wind: {d.wind} km/h</p>
                <p>🌧️ Rain: {d.rain} mm</p>
              </div>

              {/* Glow overlay for classiness */}
              <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-20 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
