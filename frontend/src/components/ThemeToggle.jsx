import React from "react";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 rounded-full text-sm font-medium transition 
                 bg-gray-800 text-white hover:bg-gray-700
                 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
