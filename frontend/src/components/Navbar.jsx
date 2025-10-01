import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";   // 👈 import toggle

export default function Navbar({ unit, setUnit, darkMode, setDarkMode }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow bg-white dark:bg-gray-900 transition">
      {/* Left: Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-sky-600 dark:text-sky-300"
      >
        🌤️ Weather Now
      </Link>

      {/* Center: Links */}
      <div className="flex space-x-6 text-gray-700 dark:text-gray-300">
        <Link to="/">Home</Link>
        <Link to="/forecast">Forecast</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Right: Unit + Theme Toggle */}
      <div className="flex items-center gap-3">
        {/* °C / °F switch */}
        

        {/* Theme toggle button */}
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </nav>
  );
}
