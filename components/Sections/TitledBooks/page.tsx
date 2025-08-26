"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Book {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  cover_image?: string;
  category_name: string;
}

export default function GlassCarousel() {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const router = useRouter();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("http://127.0.0.1:8000/books"); 
        const data = await res.json();
        setBooks(data.slice(0, 8));
        setActiveBook(data[0]);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    }
    fetchBooks();
  }, []);

  // 🔹 Auto-Rotate every 5s
  useEffect(() => {
    if (books.length === 0) return;
    const interval = setInterval(() => {
      setActiveBook((prev) => {
        if (!prev) return books[0];
        const currentIndex = books.findIndex((b) => b._id === prev._id);
        return books[(currentIndex + 1) % books.length];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [books]);

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const handleReadMore = (bookId: string) => {
    if (isLoggedIn()) {
      router.push(`/books/${bookId}`);
    } else {
      router.push("user/signup");
    }
  };


  const categories = ["All", ...new Set(books.map((b) => b.category_name))];
  const filteredBooks =
    filter === "All" ? books : books.filter((b) => b.category_name === filter);

  return (
    <section className="relative py-20 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left - Books */}
      <div>
        {/* Category Filter */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                filter === cat
                  ? "bg-white/30 text-white border border-white/50"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Book Grid */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {filteredBooks.map((book, idx) => (
            <div
              key={book._id}
              onMouseEnter={() => setActiveBook(book)}
              onClick={() => setActiveBook(book)} 
              className={`w-32 h-48 rounded-xl overflow-hidden shadow-xl 
                transform transition duration-500 cursor-pointer 
                hover:-translate-y-3 hover:scale-110 hover:rotate-3`}
            >
              <img
                src={book.cover_image || "/placeholder.png"}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right - Glass Panel */}
      <div className="relative p-8 rounded-xl backdrop-blur-lg bg-white/5 border border-white/30 shadow-[0_6px_24px_rgba(0,0,0,0.35)] overflow-hidden">
        <AnimatePresence mode="wait">
          {activeBook ? (
            <motion.div
              key={activeBook._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white drop-shadow-md tracking-tight">
                {activeBook.title}
              </h2>
              <p className="text-lg text-gray-200 mt-2 font-medium">
                by {activeBook.author}
              </p>
              <p className="text-sm text-gray-300 italic mt-1">
                Published by {activeBook.publisher}
              </p>

              {/* Decorative underline */}
              <div className="w-16 h-1 bg-white/40 rounded-full mt-5 mb-6"></div>

              <p className="text-gray-300 max-w-md text-sm leading-relaxed">
                Dive into this amazing book and explore its world of imagination
                and storytelling.
              </p>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => handleReadMore(activeBook._id)}
                  className="px-5 py-2.5 bg-white/20 text-white text-sm font-medium rounded-lg border border-white/40 hover:bg-white/30 transition"
                >
                  Read More
                </button>
              </div>
            </motion.div>
          ) : (
            <p className="text-gray-400">Hover or tap a book to see details</p>
          )}
        </AnimatePresence>

        {/* Floating Glass Accents */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
}
