"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SimilarBooks({ similarBooks }: { similarBooks: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Similar Books */}
      {similarBooks.length > 0 && (
        <div className="mt-12 relative">
          <h2 className="text-2xl font-bold mb-6">Similar Books</h2>

          {/* Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
          >
            {similarBooks.map((b) => (
              <Link
                key={b._id}
                href={`/books/${b._id}`}
                className="flex-none w-64 sm:w-56 xs:w-48 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition transform"
              >
                <img
                  src={b.cover_image || "/placeholder.png"}
                  alt={b.title}
                  className="w-full h-72 sm:h-60 xs:h-56 object-cover rounded-t-2xl"
                />
                <div className="p-4 text-white">
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                  <p className="text-sm text-gray-300">{b.author}</p>
                  <p className="text-xs text-gray-400">{b.publisher}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
