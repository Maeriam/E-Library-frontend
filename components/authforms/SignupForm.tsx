"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1920&auto=format&fit=crop",
  ];

  useEffect(() => {
    setPasswordsMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/user/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/user/login"), 1500);
    } catch (err: any) {
      if (Array.isArray(err.response?.data?.detail)) {
        const firstError = err.response.data.detail[0]?.msg || "Validation error";
        setError(firstError);
      } else {
        setError(err.response?.data?.detail || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (isError: boolean) =>
    `mt-1 w-full border px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black ${
      isError ? "border-red-500 focus:ring-red-500" : "border-gray-300"
    }`;

  return (
    <div className="flex min-h-screen pt-15">
      {/* Left side image with animation */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        {heroImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: index === currentImage ? 1 : 0,
              scale: index === currentImage ? 1.05 : 1,
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Right side form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 p-8"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg space-y-5"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Create Your Account</h1>
            <p className="mt-1 text-sm text-gray-500">
              Join our library to borrow books, track your reading, and more.
            </p>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
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
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className={inputClass(!passwordsMatch && formData.confirmPassword.length > 0)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className={inputClass(!passwordsMatch && formData.confirmPassword.length > 0)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Messages */}
          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white font-semibold py-2 rounded transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/user/login" className="text-black underline">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
