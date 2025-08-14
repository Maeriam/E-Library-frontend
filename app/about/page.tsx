"use client";

import Image from "next/image";

export default function AboutPage() {
  const team = [
    { name: "Alice Johnson", role: "Library Head", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Brian Smith", role: "Frontend Developer", img: "https://randomuser.me/api/portraits/men/46.jpg" },
    { name: "Clara Lee", role: "Backend Developer", img: "https://randomuser.me/api/portraits/women/47.jpg" },
    { name: "David Kim", role: "UI/UX Designer", img: "https://randomuser.me/api/portraits/men/48.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Our Library</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Connecting readers to knowledge, one book at a time.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-gray-700 mb-8">
          Our mission is to provide access to a wide variety of books and digital resources, fostering learning, curiosity, and personal growth for readers of all ages.
        </p>
        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
        <p className="text-gray-700">
          To become a world-class digital library where knowledge meets innovation, making reading and learning accessible to everyone, everywhere.
        </p>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                <img
  src={member.img}
  alt={member.name}
  className="mx-auto rounded-full object-cover w-36 h-36"
/>

                <h3 className="mt-4 font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts / Stats */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-3xl font-bold text-gray-600 mb-2">10k+</h3>
            <p className="text-gray-700">Books Available</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-3xl font-bold text-gray-600 mb-2">5k+</h3>
            <p className="text-gray-700">Active Members</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-3xl font-bold text-gray-600 mb-2">200+</h3>
            <p className="text-gray-700">Authors & Contributors</p>
          </div>
        </div>
      </section>
    </div>
  );
}
