import React from "react";
import WEATHER_CODE from "../utils/weatherCodes";

export default function WeatherCard({ place, current, unit }) {
  const toF = (c) => (c * 9) / 5 + 32;
  const displayTemp = (c) =>
    unit === "c" ? Math.round(c) : Math.round(toF(c));

  const wxMeta = WEATHER_CODE[current?.weather_code] || { label: "", emoji: "" };

  return (
    <div className="p-6 bg-white shadow rounded-xl space-y-3">
      <h2 className="text-lg font-bold">
        {place.name} <span className="text-gray-500">{place.country}</span>
      </h2>
      <div className="flex items-center gap-4">
        <div className="text-5xl font-bold">{displayTemp(current.temperature_2m)}°</div>
        <div>
          <p className="text-xl flex items-center gap-2">
            {wxMeta.emoji} {wxMeta.label}
          </p>
          <p className="text-sm">Humidity: {current.relative_humidity_2m}%</p>
          <p className="text-sm">Wind: {current.wind_speed_10m} km/h</p>
        </div>
      </div>
    </div>
  );
}
