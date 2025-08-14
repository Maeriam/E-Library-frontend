"use client";

import React from "react";
import { HiOutlineBookOpen, HiOutlineClipboardList, HiOutlineUserCircle } from "react-icons/hi";

export default function ProfilePage() {
  // Sample user data (replace with backend later)
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    borrowedBooks: [
      "Atomic Habits",
      "Educated",
      "The Midnight Library",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-indigo-50 rounded-lg p-4 shadow">
            <HiOutlineBookOpen className="mx-auto text-indigo-600 text-3xl mb-2" />
            <p className="text-gray-800 font-semibold">{user.borrowedBooks.length}</p>
            <p className="text-gray-600 text-sm">Books Borrowed</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 shadow">
            <HiOutlineClipboardList className="mx-auto text-indigo-600 text-3xl mb-2" />
            <p className="text-gray-800 font-semibold">12</p>
            <p className="text-gray-600 text-sm">Books Returned</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 shadow">
            <HiOutlineUserCircle className="mx-auto text-indigo-600 text-3xl mb-2" />
            <p className="text-gray-800 font-semibold">Member</p>
            <p className="text-gray-600 text-sm">Since 2023</p>
          </div>
        </div>

        {/* Borrowed Books */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Currently Borrowed Books</h2>
          <ul className="space-y-3">
            {user.borrowedBooks.map((book, index) => (
              <li
                key={index}
                className="bg-gray-50 rounded-lg shadow p-4 flex justify-between items-center hover:bg-gray-100 transition"
              >
                <span>{book}</span>
                <button className="text-indigo-600 hover:underline">Return</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
