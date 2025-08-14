"use client";

import React from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineUser, HiOutlineChat } from "react-icons/hi";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* Form */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Contact Us
          </h1>
          <p className="text-gray-600 mb-8 text-center md:text-left">
            Have questions, suggestions, or need help? Fill out the form below and we’ll get back to you.
          </p>

          <form className="space-y-6">
            {/* Name */}
            <div className="relative">
              <HiOutlineUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                required
                className="pl-10 w-full border border-gray-300 rounded-md py-3 focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <HiOutlineMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                required
                className="pl-10 w-full border border-gray-300 rounded-md py-3 focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-400"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <HiOutlineChat className="absolute top-3 left-3 text-gray-400" />
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                required
                className="pl-10 w-full border border-gray-300 rounded-md py-3 focus:outline-none focus:ring-2 focus:ring-gray-600 placeholder-gray-400 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info + Map */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Contact Info</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <HiOutlineMail className="text-gray-600" /> support@elibrary.com
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <HiOutlinePhone className="text-gray-600" /> +234 800 123 4567
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <HiOutlineLocationMarker className="text-gray-600" /> 123 Library St, Lagos, Nigeria
            </p>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-xl">
            <iframe
              title="Library Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.123456789!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf123456789ab%3A0xabcdef123456789!2s123%20Library%20St%2C%20Lagos!5e0!3m2!1sen!2sng!4v1691900000000!5m2!1sen!2sng"
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
