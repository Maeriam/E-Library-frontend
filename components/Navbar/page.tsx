"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

type NavLink = {
  href: string;
  label: string;
  onClick?: () => void;
};

export default function Navbar() {
  const [role, setRole] = useState<"guest" | "user" | "admin">("guest");
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    console.log("User logged out");
    setRole("guest");
    setMenuOpen(false);
  };

  const guestLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Books" },
    { href: "/contact", label: "Contact Us" },
    { href: "/user/login", label: "User Login" },
    { href: "/user/register", label: "User Signup" },
    { href: "/admin/login", label: "Admin Login" },
  ];

  const userLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Books" },
    { href: "/user/dashboard", label: "Dashboard" },
    { href: "#", label: "Logout", onClick: logout },
  ];

  const adminLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "#", label: "Logout", onClick: logout },
  ];

  const navLinks =
    role === "user" ? userLinks : role === "admin" ? adminLinks : guestLinks;

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <h3 className="font-bold text-2xl text-gray-800">
          Library Management System
        </h3>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => (
            <li key={index}>
              {link.onClick ? (
                <button
                  onClick={link.onClick}
                  className="text-gray-600 hover:underline"
                >
                  {link.label}
                </button>
              ) : (
                <Link href={link.href} className="text-gray-600 hover:underline">
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-6 py-4 space-y-4">
          {navLinks.map((link, index) => (
            <div key={index}>
              {link.onClick ? (
                <button
                  onClick={link.onClick}
                  className="block w-full text-left text-gray-600 hover:underline"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="block text-gray-600 hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
