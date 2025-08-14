import React from 'react'
import Link from 'next/link';

export default function page() {
  return (
    <div>
       <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">E-Library</h3>
          <p className="text-gray-400">
            Explore, read, and borrow your favorite books from anywhere.
            Join our community of avid readers today.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link href="/books" className="hover:text-white">Books</Link>
            </li>
            <li>
              <Link href="/user/login" className="hover:text-white">User Login</Link>
            </li>
            <li>
              <Link href="/user/signup" className="hover:text-white">Sign Up</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400 mb-4">123 Library Street, Booktown, BK 45678</p>
          <p className="text-gray-400 mb-4">Email: info@elibrary.com</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} E-Library. All rights reserved.
      </div>
    </footer>
    </div>
  )
}
