import React from "react";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <main className="flex-grow max-w-4xl mx-auto p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-sky-700">
          About Weather Now
        </h1>

        <div className="space-y-5 text-lg">
          <p className="flex items-start gap-2">
            <span className="text-2xl">🌤️</span>
            <span>
              <strong>Weather Now</strong> is a modern React application that
              provides real-time weather updates for any city using the{" "}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noreferrer"
                className="text-sky-600 underline hover:text-sky-800 transition-colors"
              >
                Open-Meteo API
              </a>
              .
            </span>
          </p>

          <p className="flex items-start gap-2">
            <span className="text-2xl">📍</span>
            <span>
              Enter a city name or use your current location to see the latest
              temperature, weather conditions, and a 7-day forecast.
            </span>
          </p>

          <p className="flex items-start gap-2">
            <span className="text-2xl">⚡</span>
            <span>
              Built with <strong>React</strong>, styled using{" "}
              <strong>Tailwind CSS</strong>, and deployed on <strong>Vercel</strong>.
              It demonstrates clean API integration, efficient state management,
              and a fully responsive design.
            </span>
          </p>

          <p className="flex items-start gap-2">
            <span className="text-2xl">💡</span>
            <span>
              Perfect as a take-home UI challenge or a small project to showcase
              modern frontend skills.
            </span>
          </p>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          👨‍💻 Created with ❤️ by a passionate developer.
        </p>
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}
