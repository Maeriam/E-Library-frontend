"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

// Mock book data
const mockBooks = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "A story about the infinite possibilities of life...",
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop",
    category: "Fiction",
  },
  {
    id: "2",
    title: "Educated",
    author: "Tara Westover",
    description: "A memoir about growing up in a strict family...",
    img: "https://images.unsplash.com/photo-1529651737248-dad5e287768e?q=80&w=800&auto=format&fit=crop",
    category: "Biography",
  },
  
  // Add more mock books if you want
];

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [book, setBook] = useState<any>(null);
  const [similarBooks, setSimilarBooks] = useState<any[]>([]);

  useEffect(() => {
    const found = mockBooks.find((b) => b.id === id);
    setBook(found || null);

    const similar = mockBooks.filter((b) => b.category === found?.category && b.id !== id);
    setSimilarBooks(similar);
  }, [id]);

  if (!book) return <div className="text-center py-20">Book not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Book Info */}
      <div className="flex flex-col md:flex-row gap-8">
        <img src={book.img} alt={book.title} className="w-full md:w-64 h-80 object-cover rounded-lg shadow" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-700 mb-4">By {book.author}</p>
          <p className="text-gray-600 mb-6">{book.description}</p>
          
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
              <Link key={b.id} href={`/books/${b.id}`} className="flex-none w-48 bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-56 object-cover" />
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
