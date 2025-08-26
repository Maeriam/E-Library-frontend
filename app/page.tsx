"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; 
import CategoriesSection from "../components/Sections/CategoriesSection/page";
import TitledBooks from "../components/Sections/TitledBooks/page";
import AboutSection from "../components/Sections/AboutSection/page";


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function HomePage() {
  const heroImages = [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/books?search=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background image with fade */}
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImages[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
          >
            Discover Your Next Favorite Book
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl mb-8"
          >
            Browse thousands of books, articles, and resources anytime, anywhere.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl mx-auto bg-white/20 backdrop-blur-lg rounded-full shadow-lg flex flex-col sm:flex-row overflow-hidden"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for books..."
              className="flex-grow px-4 py-3 text-sm sm:text-base text-white placeholder:text-gray-300 outline-none bg-transparent"
            />
            <button
              type="submit"
              className="bg-black/70 px-6 py-3 text-sm sm:text-base font-medium text-white hover:bg-black/80 hover:scale-105 transition-transform"
            >
              Search
            </button>
          </motion.form>
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
        <div className="relative z-10 space-y-16 sm:space-y-24 px-4 sm:px-6 lg:px-12">
          {/* Categories Section */}
          <motion.section
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <CategoriesSection />
          </motion.section>

          {/* About Section */}
          <motion.section
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <AboutSection />
          </motion.section>

          {/* Titled Books Section */}
          <motion.section
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <TitledBooks />
          </motion.section>

          {/* Call To Action */}
          <motion.section
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="py-16 sm:py-20 text-center text-white"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Join Thousands of Readers Worldwide
            </h2>
            <p className="text-gray-200 mb-8 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Create a free account and start building your digital library today.
            </p>
            <Link
              href="user/signup"
              className="inline-block bg-white/20 backdrop-blur-md text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:bg-white/30 transition"
            >
              Get Started
            </Link>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
