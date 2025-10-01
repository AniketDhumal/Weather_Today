import React, { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); // success or error message
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="flex flex-col items-center justify-center p-6 md:p-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-gray-900 dark:text-gray-100">
          📬 Get in Touch
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-12 text-center max-w-xl leading-relaxed">
          Have a question or feedback? We'd love to hear from you. Fill out the
          form below, and our team will get back to you as soon as possible.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg shadow-2xl rounded-3xl p-8 space-y-6 border border-white/20 dark:border-gray-700/50 transition"
        >
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-500 dark:text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700/70 dark:text-white focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 outline-none transition-transform duration-200 hover:scale-[1.02]"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-500 dark:text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700/70 dark:text-white focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 outline-none transition-transform duration-200 hover:scale-[1.02]"
              required
            />
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3.5 text-gray-500 dark:text-gray-400" size={20} />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700/70 dark:text-white focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 outline-none resize-none transition-transform duration-200 hover:scale-[1.02]"
              required
            ></textarea>
          </div>

          {/* Status */}
          {status && (
            <p
              className={`text-center font-medium ${
                status.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "🚀 Send Message"}
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-12 text-center space-y-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
          <p>
            📧 Email: <span className="font-medium text-sky-600 dark:text-sky-400">support@weathernow.com</span>
          </p>
          <p>📍 Location: Pune, India</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
