"use client";

import React from "react";
import { BookOpen, Globe, Users, Sparkles, Layers, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About Our E-Library
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Making knowledge accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Blurred Background Wrapper */}
      <div className="relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/e3/2e/81/e32e81951afc545c70e9ab09f4374c39.jpg')",
          }}
        />
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

        {/* Foreground Sections */}
        <div className="relative z-10 space-y-16 sm:space-y-24 px-4 sm:px-6 lg:px-12 py-16">
          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-10">
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <BookOpen className="mx-auto text-white w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
              <p className="text-gray-200">
                To provide unlimited access to a wide variety of books and
                digital resources, fostering curiosity, creativity, and lifelong
                learning for readers of all ages.
              </p>
            </div>
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition">
              <Globe className="mx-auto text-white w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
              <p className="text-gray-200">
                To become a world-class digital library where knowledge meets
                innovation, making reading and research accessible anytime,
                anywhere.
              </p>
            </div>
          </section>

          {/* Core Values */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-12 text-white">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  icon: <Layers className="mx-auto text-white w-10 h-10 mb-3" />,
                  title: "Accessibility",
                  desc: "Open knowledge for everyone, without barriers.",
                },
                {
                  icon: (
                    <Sparkles className="mx-auto text-white w-10 h-10 mb-3" />
                  ),
                  title: "Innovation",
                  desc: "Using technology to enhance the reading experience.",
                },
                {
                  icon: <Users className="mx-auto text-white w-10 h-10 mb-3" />,
                  title: "Community",
                  desc: "Connecting readers, authors, and institutions worldwide.",
                },
                {
                  icon: <Clock className="mx-auto text-white w-10 h-10 mb-3" />,
                  title: "Lifelong Learning",
                  desc: "Encouraging curiosity and growth beyond the classroom.",
                },
              ].map((val, i) => (
                <div
                  key={i}
                  className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg hover:scale-105 transition"
                >
                  {val.icon}
                  <h3 className="font-semibold text-white">{val.title}</h3>
                  <p className="text-sm text-gray-200 mt-2">{val.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-12 text-white">
              Why Choose Our E-Library?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "24/7 Access",
                  desc: "Read anytime, anywhere — on any device.",
                },
                {
                  title: "Smart Search",
                  desc: "Find books by title, author, publisher, or category in seconds.",
                },
                {
                  title: "Online & Offline",
                  desc: "Read online or download (if allowed by admin).",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
                >
                  <h3 className="font-bold text-xl text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
