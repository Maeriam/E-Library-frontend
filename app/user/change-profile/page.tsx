"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

export default function ChangeProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (newPassword && newPassword !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Update profile info
      await axios.put(
        `http://127.0.0.1:8000/user/${user.id}`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update password if filled
      if (oldPassword && newPassword) {
        await axios.put(
          `http://127.0.0.1:8000/user/${user.id}/password`,
          {
            old_password: oldPassword,
            new_password: newPassword,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Update localStorage with new data
      const updatedUser = { ...user, name, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Notify ProfileModal to refresh
      window.dispatchEvent(new Event("authChange"));

      setSuccess("Profile updated successfully ✅");

      setTimeout(() => {
        router.push("/user/profile-page");
      }, 1200);
    } catch (error: any) {
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/13/36/ae/1336ae5845f6e180b769e97b87d03704.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/50" />

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-black to-gray-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {name ? name[0].toUpperCase() : "U"}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Change Profile
        </h2>

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="pl-10 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="pl-10 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black-500 focus:outline-none"
            />
          </div>

          <hr className="my-4" />

          {/* Old Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              className="pl-10 pr-10 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="pl-10 pr-10 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className={`pl-10 pr-10 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:outline-none ${
                confirmPassword && newPassword !== confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-black"
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-black to-gray-700 text-white font-medium rounded-xl hover:from-black hover:to-gray-600 disabled:opacity-50 transition shadow-md"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
