"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FeaturedBooks from "@/components/BookCard/page";

export default function HomePage() {
  const heroImages = [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center text-white transition-all duration-1000"
        style={{
          backgroundImage: `url(${heroImages[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Browse thousands of books, articles, and resources anytime, anywhere.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto bg-white rounded-full shadow-lg flex flex-col sm:flex-row overflow-hidden">
            <input
              type="text"
              placeholder="Search for books..."
              className="flex-grow px-4 py-3 text-gray-800 outline-none"
            />
            <button className="bg-black px-6 py-3 text-white">
              Search
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href="/user/signup"
              className="bg-white text-gray-700 px-6 py-3 rounded-full shadow hover:bg-gray-100"
            >
              Join Now
            </Link>
            <Link
              href="/books"
              className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-gray-700"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              Popular Categories
            </h2>
             <p className="text-gray-600 leading-relaxed mb-6">
        Explore our most visited book categories, hand-picked to match what
        readers love the most. Whether you’re into science, fiction, or
        biographies, there’s something for everyone.
      </p>
            <a
        href="/categories"
        className="inline-block bg-black text-white px-5 py-3 rounded-full shadow hover:bg-gray-800"
      >
        View All Categories
      </a>
          </div>

          {/* Right - Circle */}
          <div className="relative mx-auto w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem]">
            {[
              { name: "Science", img: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1802&auto=format&fit=crop" },
              { name: "Technology", img: "https://plus.unsplash.com/premium_photo-1683120972279-87efe2ba252f?w=600&auto=format&fit=crop&q=60" },
              { name: "History", img: "https://images.unsplash.com/photo-1582034438152-77bc94ffa6ae?w=600&auto=format&fit=crop&q=60" },
              { name: "Fiction", img: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=600&auto=format&fit=crop&q=60" },
              { name: "Biography", img: "https://images.unsplash.com/photo-1582739010387-0b49ea2adaf6?w=600&auto=format&fit=crop&q=60" },
              { name: "Comics", img: "https://images.unsplash.com/photo-1620336655055-088d06e36bf0?w=600&auto=format&fit=crop&q=60" },
            ].map((cat, i, arr) => {
              const angle = (i / arr.length) * 2 * Math.PI;
              const radius = 120;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);

              return (
                <div
                  key={i}
                  className="absolute flex flex-col items-center text-center transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-md hover:scale-110 transition-transform"
                  />
                  <p className="mt-2 text-xs sm:text-sm font-medium text-gray-700">{cat.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Books */}

      <FeaturedBooks />
    </div>
  );
}
