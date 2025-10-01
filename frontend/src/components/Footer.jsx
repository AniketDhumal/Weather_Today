import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-4 space-y-4 md:space-y-0">
        
        {/* Left - App Name */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-xl md:text-lg flex items-center justify-center md:justify-start gap-2">
            🌤️ Weather Now
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Real-time forecasts powered by Open-Meteo API
          </p>
        </div>

        {/* Center - Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-center gap-4 text-sm">
          <Link className="hover:text-sky-500 transition-colors" to="/">Home</Link>
          <Link className="hover:text-sky-500 transition-colors" to="/forecast">Forecast</Link>
          <Link className="hover:text-sky-500 transition-colors" to="/favorites">Favorites</Link>
          <Link className="hover:text-sky-500 transition-colors" to="/about">About</Link>
          <Link className="hover:text-sky-500 transition-colors" to="/contact">Contact</Link>
        </nav>

        {/* Right - Copyright */}
        <div className="text-center md:text-right text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Weather Now • Built with React ⚛️ + Tailwind CSS
        </div>
      </div>
    </footer>
  );
}
