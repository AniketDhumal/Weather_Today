import React from "react";

export default function SearchBar({
  city,
  setCity,
  onSearch,
  useMyLocation,
  loading,
  error,
  recent,
}) {
  return (
    <div className="p-4 bg-white shadow rounded-xl space-y-3">
      <div className="flex flex-col md:flex-row gap-2">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 rounded-xl border"
        />
        <div className="flex gap-2">
          <button
            onClick={onSearch}
            disabled={loading}
            className="px-4 py-2 bg-sky-600 text-white rounded-xl"
          >
            {loading ? "Loading..." : "Search"}
          </button>
          <button
            onClick={useMyLocation}
            disabled={loading}
            className="px-4 py-2 border rounded-xl"
          >
            Use my location
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {recent?.length > 0 && (
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-gray-500">Recent:</span>
          {recent.map((r, idx) => (
            <button
              key={idx}
              onClick={() => onSearch(r.q)}
              className="px-3 py-1 border rounded-full"
            >
              {r.key}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
