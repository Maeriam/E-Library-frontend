"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Book } from "@/app/types/books"; 

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000", 
});

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
       
        const res = await api.get<Book>(`/books/${id}`);
        setBook(res.data);

        
        const allRes = await api.get<Book[]>(`/books`);
        const similar = allRes.data.filter(
          (b) => b.category === res.data.category && b.id !== res.data.id
        );
        setSimilarBooks(similar);
      } catch (err) {
        console.error("Failed to fetch book details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!book) return <div className="text-center py-20">Book not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Book Info */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={book.cover_image || "https://via.placeholder.com/300x400?text=No+Image"}
          alt={book.title}
          className="w-full md:w-64 h-80 object-cover rounded-lg shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-700 mb-2">By {book.author}</p>
          <p className="text-gray-500 mb-4">Publisher: {book.publisher}</p>
          <p className="text-gray-600 mb-6">
            {book.downloadable
              ? "This book is available for download."
              : "This book is not available for download."}
          </p>

          <button className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 mr-4">
            Borrow Book
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Similar Books */}
      {similarBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Books</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {similarBooks.map((b) => (
              <Link
                key={b.id}
                href={`/books/${b.id}`}
                className="flex-none w-48 bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={b.cover_image || "https://via.placeholder.com/300x400?text=No+Image"}
                  alt={b.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <p className="text-sm text-gray-600">{b.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
