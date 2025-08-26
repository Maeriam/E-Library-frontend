"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { HiOutlineBookOpen, HiOutlineDownload } from "react-icons/hi";
import SimilarBooks from "@/components/Sections/SimilarBooksSection/page";

interface Book {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  cover_image?: string;
  category_name: string;
  category_id: string;
  file?: string;
  downloadable: boolean;
}

export default function BookDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get<Book>(`http://127.0.0.1:8000/books/${id}`);
        setBook(res.data);

        const allBooks = await axios.get<Book[]>(`http://127.0.0.1:8000/books`);
        const similar = allBooks.data.filter(
          (b) => b.category_id === res.data.category_id && b._id !== res.data._id
        );
        setSimilarBooks(similar);
      } catch (err) {
        console.error("Error fetching book", err);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <p className="p-6 text-center text-white">Loading...</p>;

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Hero background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${book.cover_image || "/placeholder.png"})`,
        }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Book Info Card */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8 items-center">
          <img
            src={book.cover_image || "/placeholder.png"}
            alt={book.title}
            className="w-full md:w-64 h-80 object-cover rounded-2xl shadow"
          />
          <div className="flex-1 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>
            <p className="text-lg text-gray-300 mt-1">By {book.author}</p>
            <p className="text-sm text-gray-400 mt-1">Publisher: {book.publisher}</p>
            <p className="text-sm italic text-gray-400 mt-1">Category: {book.category_name}</p>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3 flex-wrap">
              {book.file && (
                <a
                  href={book.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <HiOutlineBookOpen className="w-5 h-5" />
                  Read Online
                </a>
              )}

              {book.downloadable && book.file && (
                <a
                  href={book.file}
                  download
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <HiOutlineDownload className="w-5 h-5" />
                  Download
                </a>
              )}
            </div>

            <button
              onClick={() => router.back()}
              className="mt-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
            >
              ← Go Back
            </button>
          </div>
        </div>

        {/* Similar Books */}
        <section className="mt-10">
          <SimilarBooks similarBooks={similarBooks} />
        </section>
      </div>
    </div>
  );
}
