import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative">
      {/* Background Gradient / Glass effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-black"></div>
      <div className="relative max-w-7xl mx-auto px-8 py-16 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-7 h-7 text-white" />
              <h3 className="text-2xl font-bold text-white">E-Library</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Explore, read, and borrow your favorite books from anywhere.
              Join our growing community of readers today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-white transition">
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition"
                >
                  AboutUs
                </Link>
              </li>
            
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Socials */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">
              Contact Us
            </h4>
            <p className="text-gray-400 mb-3">
              123 Library Street, Booktown, BK 45678
            </p>
            <p className="text-gray-400 mb-6">info@elibrary.com</p>

            <div className="flex space-x-5">
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-black hover:text-white transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-black hover:text-white transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-black hover:text-white transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} E-Library. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
