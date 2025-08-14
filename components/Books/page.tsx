"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { Book } from "@/app/types/books";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const authors = ["Matt Haig", "Tara Westover", "Michelle Obama", "James Clear", "Yuval Noah Harari"];

 
  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      console.log("Books API response:", res.data); 
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  fetchBooks();
}, []);


  const filteredBooks = books.filter((book) => {
    return (
      (selectedCategory ? book.category === selectedCategory : true) &&
      (selectedAuthor ? book.author === selectedAuthor : true) &&
      (searchQuery ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
          Browse Books
        </h1>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center items-center">
          {/* Author */}
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="px-4 py-3 rounded-full border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="flex flex-grow max-w-xl">
            <input
              type="text"
              placeholder="Search by book title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-3 rounded-l-full border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <button className="bg-gray-600 text-white px-6 py-3 rounded-r-full hover:bg-gray-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.id || `${book.title}-${book.author}`} 
                className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden"
              >
                <img src={book.cover_image} alt={book.title} className="w-full h-72 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <Link
                    href={`/books/${book.id}`}
                    className="text-gray-600 hover:underline mt-3 inline-block font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No books match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
