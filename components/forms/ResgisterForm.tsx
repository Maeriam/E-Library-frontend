"use client";

import React from "react";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1920&auto=format&fit=crop')" }}>
      </div>

      {/* Right side form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 p-8">
        <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create Your Library Account
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Join our library to borrow books, track your reading, and more.
            </p>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              placeholder="library_user"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="••••••••"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              placeholder="••••••••"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800 transition"
          >
            Sign Up
          </button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/user/login" className="text-black underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
