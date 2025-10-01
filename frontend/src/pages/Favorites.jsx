import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [form, setForm] = useState({ city: "", country: "" });
  const [addForecastFor, setAddForecastFor] = useState(null);
  const [editForecast, setEditForecast] = useState(null);
  const [forecastForm, setForecastForm] = useState({
    day: "",
    temperature: "",
    humidity: "",
    wind: "",
    icon: "☀️",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all favorites
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/favorites");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load favorites");
        setFavorites(data);
      } catch (err) {
        setStatus(`❌ ${err.message}`);
      }
    };
    load();
  }, []);

  // Handle inputs
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleForecastChange = (e) =>
    setForecastForm({ ...forecastForm, [e.target.name]: e.target.value });

  // Add City
  const handleAddCity = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setStatus("");
      console.log("Sending city form:", form);

      const res = await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: form.city.trim(),
          country: form.country.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add city");

      setFavorites([data, ...favorites]);
      setForm({ city: "", country: "" });
      setStatus("✅ City added!");
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete City
  const handleDeleteCity = async (id) => {
    try {
      setStatus("");
      const res = await fetch(`http://localhost:5000/api/favorites/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete city");

      setFavorites((prev) => prev.filter((c) => c._id !== id));
      setStatus("🗑️ City deleted");
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  // Add Forecast
  const handleAddForecast = async (e) => {
    e.preventDefault();
    try {
      setStatus("");
      const res = await fetch(
        `http://localhost:5000/api/favorites/${addForecastFor}/forecast`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            day: forecastForm.day,
            temperature: Number(forecastForm.temperature),
            humidity: Number(forecastForm.humidity),
            wind: Number(forecastForm.wind),
            icon: forecastForm.icon,
          }),
        }
      );
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Failed to add forecast");

      setFavorites((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
      setForecastForm({ day: "", temperature: "", humidity: "", wind: "", icon: "☀️" });
      setAddForecastFor(null);
      setStatus("✅ Forecast added");
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  // Edit Forecast
  const handleUpdateForecast = async (e) => {
    e.preventDefault();
    try {
      setStatus("");
      const body = {
        day: editForecast.day,
        temperature: Number(editForecast.temperature),
        humidity: Number(editForecast.humidity),
        wind: Number(editForecast.wind),
        icon: editForecast.icon,
      };

      const res = await fetch(
        `http://localhost:5000/api/favorites/${editForecast.cityId}/forecast/${editForecast._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Failed to update forecast");

      setFavorites((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
      setEditForecast(null);
      setStatus("✏️ Forecast updated");
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  // Delete Forecast
  const handleDeleteForecast = async (cityId, forecastId) => {
    try {
      setStatus("");
      const res = await fetch(
        `http://localhost:5000/api/favorites/${cityId}/forecast/${forecastId}`,
        { method: "DELETE" }
      );
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Failed to delete forecast");

      setFavorites((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
      setStatus("🗑️ Forecast deleted");
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50 dark:bg-gray-900">
      <div className="flex-grow p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          🌍 Favorite Cities
        </h2>

        {status && <p className="mb-4 text-center text-sm">{status}</p>}

        {/* Add City */}
        <form onSubmit={handleAddCity} className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            name="city"
            placeholder="🏙 City"
            value={form.city}
            onChange={handleChange}
            required
            className="px-3 py-2 border rounded flex-grow"
          />
          <input
            type="text"
            name="country"
            placeholder="🌍 Country"
            value={form.country}
            onChange={handleChange}
            required
            className="px-3 py-2 border rounded flex-grow"
          />
          <button type="submit" disabled={loading}
            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600">
            {loading ? "Adding..." : "➕ Add City"}
          </button>
        </form>

        {/* City Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((fav) => (
            <div key={fav._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col hover:shadow-2xl transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {fav.city || "Unknown City"}, {fav.country || "Unknown Country"}
                </h3>

                {/* Delete city button (was incorrectly calling handleDeleteForecast in header) */}
                <button onClick={() => handleDeleteCity(fav._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  ❌ Delete City
                </button>
              </div>

              {fav.forecasts && fav.forecasts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {fav.forecasts.map((fc, idx) => (
                    <div key={fc._id ?? `${fav._id}-${idx}`} className="bg-sky-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <p className="font-semibold">{fc.day}</p>
                      <p className="text-2xl">{fc.icon}</p>
                      <p>{fc.temperature}°C</p>
                      <p className="text-sm">💧 {fc.humidity}%</p>
                      <p className="text-sm">💨 {fc.wind} km/h</p>
                      <div className="flex gap-1 justify-center mt-2">
                        <button onClick={() => setEditForecast({ ...fc, cityId: fav._id })}
                          className="px-2 py-1 bg-yellow-500 text-white rounded text-xs">Edit</button>
                        <button onClick={() => handleDeleteForecast(fav._id, fc._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No forecasts yet.</p>
              )}

              <button onClick={() => setAddForecastFor(fav._id)} className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
                ➕ Add Forecast
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Forecast Modal */}
      {addForecastFor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={handleAddForecast} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96 flex flex-col gap-2">
            <h3 className="text-lg font-bold mb-2">➕ Add Forecast</h3>
            <input type="text" name="day" placeholder="Day" value={forecastForm.day} onChange={handleForecastChange} required className="px-3 py-2 border rounded" />
            <input type="number" name="temperature" placeholder="Temperature °C" value={forecastForm.temperature} onChange={handleForecastChange} required className="px-3 py-2 border rounded" />
            <input type="number" name="humidity" placeholder="Humidity %" value={forecastForm.humidity} onChange={handleForecastChange} required className="px-3 py-2 border rounded" />
            <input type="number" name="wind" placeholder="Wind km/h" value={forecastForm.wind} onChange={handleForecastChange} required className="px-3 py-2 border rounded" />
            <input type="text" name="icon" placeholder="Icon (☀️ 🌧️ etc)" value={forecastForm.icon} onChange={handleForecastChange} className="px-3 py-2 border rounded" />
            <div className="flex justify-end gap-2 mt-2">
              <button type="button" onClick={() => setAddForecastFor(null)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Forecast Modal */}
      {editForecast && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={handleUpdateForecast} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96 flex flex-col gap-2">
            <h3 className="text-lg font-bold mb-2">✏️ Edit Forecast</h3>
            <input type="text" name="day" value={editForecast.day} onChange={(e) => setEditForecast({ ...editForecast, day: e.target.value })} required className="px-3 py-2 border rounded" />
            <input type="number" name="temperature" value={editForecast.temperature} onChange={(e) => setEditForecast({ ...editForecast, temperature: e.target.value })} required className="px-3 py-2 border rounded" />
            <input type="number" name="humidity" value={editForecast.humidity} onChange={(e) => setEditForecast({ ...editForecast, humidity: e.target.value })} required className="px-3 py-2 border rounded" />
            <input type="number" name="wind" value={editForecast.wind} onChange={(e) => setEditForecast({ ...editForecast, wind: e.target.value })} required className="px-3 py-2 border rounded" />
            <input type="text" name="icon" value={editForecast.icon} onChange={(e) => setEditForecast({ ...editForecast, icon: e.target.value })} className="px-3 py-2 border rounded" />
            <div className="flex justify-end gap-2 mt-2">
              <button type="button" onClick={() => setEditForecast(null)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
            </div>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}
