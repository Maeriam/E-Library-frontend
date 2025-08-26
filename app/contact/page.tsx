"use client";

import React from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlineChat,
} from "react-icons/hi";

export default function ContactPage() {
  return (
    <div className="relative py-15 min-h-screen bg-[url('https://i.pinimg.com/736x/13/36/ae/1336ae5845f6e180b769e97b87d03704.jpg')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center md:text-left">
            Contact Us
          </h1>
          <p className="text-gray-600 mb-8 text-center md:text-left">
            Have questions, suggestions, or need help? Fill out the form below
            and we’ll get back to you.
          </p>

          <form className="space-y-6">
            {/* Name */}
            <div className="relative">
              <HiOutlineUser className="absolute top-3 left-3 text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="pl-10 w-full border-2 border-gray-400 rounded-lg py-3 
                           focus:outline-none focus:ring-2 focus:ring-gray-700 
                           placeholder-gray-400 transition hover:border-gray-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <HiOutlineMail className="absolute top-3 left-3 text-gray-500 text-lg" />
              <input
                type="email"
                placeholder="Email Address"
                required
                className="pl-10 w-full border-2 border-gray-400 rounded-lg py-3 
                           focus:outline-none focus:ring-2 focus:ring-gray-700 
                           placeholder-gray-400 transition hover:border-gray-500"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <HiOutlineChat className="absolute top-3 left-3 text-gray-500 text-lg" />
              <textarea
                rows={5}
                placeholder="Write your message here..."
                required
                className="pl-10 w-full border-2 border-gray-400 rounded-lg py-3 
                           focus:outline-none focus:ring-2 focus:ring-gray-700 
                           placeholder-gray-400 resize-none transition hover:border-gray-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-800 to-gray-600 text-white py-3 rounded-lg font-semibold hover:scale-105 hover:from-gray-900 hover:to-gray-700 transition-all duration-300 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info + Map */}
        <div className="space-y-6">
          <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-2xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Contact Info</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <HiOutlineMail className="text-gray-700 text-lg" /> support@elibrary.com
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <HiOutlinePhone className="text-gray-700 text-lg" /> +234 800 123 4567
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <HiOutlineLocationMarker className="text-gray-700 text-lg" /> 123
              Library St, Lagos, Nigeria
            </p>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <iframe
              title="Library Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7922.640171779258!2d3.3895!3d6.4541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5236f7ffb3f%3A0x8dca2f4a45c342c7!2sLagos%20Island!5e0!3m2!1sen!2sng!4v1691900000000!5m2!1sen!2sng"
              width="100%"
              height="300"
              className="border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
