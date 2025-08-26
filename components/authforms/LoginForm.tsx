"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1920&auto=format&fit=crop",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
        })
      );

      window.dispatchEvent(new Event("authChange"));
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen pt-15">
      {/* Left side with transition images */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        {heroImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Right side form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex w-full md:w-1/2 items-center justify-center bg-gray-50"
      >
        <form className="relative z-10 bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              Log in to Your Account
            </h1>
            <p className="text-gray-600 text-sm">
              Access your borrowed books, reading history, and more.
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm border border-red-200 p-2 rounded bg-red-50">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleLogin}
            className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/user/signup" className="text-black underline">
              Sign up
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
