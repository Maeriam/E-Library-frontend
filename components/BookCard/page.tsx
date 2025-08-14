import Link from "next/link";

export default function FeaturedBooks() {
  const books = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Educated",
      author: "Tara Westover",
      img: "https://images.unsplash.com/photo-1529651737248-dad5e287768e?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Becoming",
      author: "Michelle Obama",
      img: "https://i.pinimg.com/736x/4d/4d/81/4d4d817b99b0767ae2ee8ecaaf128a55.jpg",
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      img: "https://i.pinimg.com/736x/4d/4d/81/4d4d817b99b0767ae2ee8ecaaf128a55.jpg",
    },
    {
      id: 5,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Books
        </h2>

        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex-none w-64 sm:w-56 xs:w-48 bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-72 sm:h-60 xs:h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
                <Link
                  href={`/books/${book.id}`}
                  className="text-gray-700 hover:underline mt-3 inline-block font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
