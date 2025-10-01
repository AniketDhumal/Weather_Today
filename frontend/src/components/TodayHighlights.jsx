import React from "react";

export default function TodayHighlights({ daily, unit }) {
  const toF = (c) => (c * 9) / 5 + 32;
  const displayTemp = (c) =>
    unit === "c" ? Math.round(c) : Math.round(toF(c));

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="font-bold mb-3">Today</h2>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>🌅 Sunrise: {new Date(daily.sunrise[0]).toLocaleTimeString()}</div>
        <div>🌇 Sunset: {new Date(daily.sunset[0]).toLocaleTimeString()}</div>
        <div>
          🌡️ Max/Min: {displayTemp(daily.temperature_2m_max[0])}° /{" "}
          {displayTemp(daily.temperature_2m_min[0])}°
        </div>
        <div>🌧️ Rain Chance: {daily.precipitation_probability_max[0]}%</div>
      </div>
    </div>
  );
}
