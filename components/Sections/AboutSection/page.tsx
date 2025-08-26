"use client";
import React, { useEffect, useState } from "react";

const images = [
  "https://i.pinimg.com/736x/95/6f/9d/956f9dd0e5d0ec87344541547af64808.jpg",
  "https://i.pinimg.com/736x/a9/1f/45/a91f455a96acb53cdd453a845db95d63.jpg",
  "https://i.pinimg.com/736x/e3/2e/81/e32e81951afc545c70e9ab09f4374c39.jpg",
];

export default function AboutPage() {
  const [current, setCurrent] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gray-900">
      {/* Background Blur */}
      <div className="absolute inset-0">
        <img
          src="https://i.pinimg.com/736x/e3/2e/81/e32e81951afc545c70e9ab09f4374c39.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <div>
          <h2 className="text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
            About <span className="text-white/70">Us</span>
          </h2>
          <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-xl">
            Books are more than pages and ink—they’re living worlds waiting
            to be explored. Our platform was built for dreamers, thinkers,
            and storytellers who believe in the power of imagination.
          </p>

          <div className="mt-10">
            <a
              href="/about"
              className="px-8 py-4 bg-white/20 text-white text-lg font-medium rounded-xl border border-white/40 hover:bg-white/30 hover:scale-105 transition transform shadow-lg"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right - Animated Swapping Images */}
        <div className="relative w-80 h-96 mx-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="About us"
              className={`absolute w-full h-full rounded-2xl object-cover shadow-2xl transition-opacity duration-1000 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
