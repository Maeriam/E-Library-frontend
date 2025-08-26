"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {  useSearchParams,useRouter } from "next/navigation"; 
import axios from "axios";

interface Book {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  cover_image?: string;
  category_id: string;
  category_name: string;
  downloadable: boolean;
  file?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

   const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  useEffect(() => {
    setSearchQuery(initialSearch); 
  }, [initialSearch]);

  const router = useRouter();
  const fullPlaceholder =
    "Search by Title, Author, Publisher, or Category...";

  useEffect(() => {
    fetchCategories();
    fetchBooks();
    startTyping();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get<Book[]>("http://127.0.0.1:8000/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get<Category[]>("http://127.0.0.1:8000/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  
  const startTyping = () => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedPlaceholder(fullPlaceholder.slice(0, i + 1));
      i++;
      if (i >= fullPlaceholder.length) clearInterval(interval);
    }, 80);
  };

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory
      ? book.category_id === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category_name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });


  const isLoggedIn = () => {
  
    return !!localStorage.getItem("token"); 
  };

  const handleViewDetails = (bookId: string) => {
    if (isLoggedIn()) {
      router.push(`/books/${bookId}`);
    } else {
      router.push("user/signup");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-gray-900 text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center h-[40vh] md:h-[50vh] text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Browse Books</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Discover thousands of books across all genres. Find your next read here.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 -mt-16">
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12 flex-wrap items-center backdrop-blur-lg bg-white/10 rounded-2xl p-4">
          <input
            type="text"
            placeholder={typedPlaceholder || "Search..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-3 rounded-lg w-full md:w-96 border border-gray-600 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          {/* Custom Styled Dropdown */}
          <div className="relative w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none px-4 py-3 rounded-lg border border-gray-600 bg-black/50 text-white w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-white transition cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-black/70 text-white">
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition transform"
            >
              <img
                src={book.cover_image || "/placeholder.png"}
                alt={book.title}
                className="w-full h-72 object-cover rounded-t-2xl"
              />
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-300">{book.author}</p>
                <p className="text-xs text-gray-400">{book.publisher}</p>
                <p className="text-xs text-gray-400 mt-1">{book.category_name}</p>

                <button
                  onClick={() => handleViewDetails(book._id)}
                  className="mt-3 inline-block text-gray-200 hover:text-white font-medium underline"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300 col-span-full">
            No books match your search.
          </p>
        )}
      </section>
    </div>
  );
}
