"use client";

import Link from "next/link";
import { UserCircle } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import ProfileDrawer from "@/app/user/profile-page/page"; 
import { BookOpen } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const checkAuth = useCallback(() => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      setIsLoggedIn(!!token);
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  
  const isAuthPage = pathname === "/user/login" || pathname === "/user/signup";

 
  useEffect(() => {
    if (isAuthPage) return;

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthPage]);

 
  useEffect(() => {
    checkAuth();
    const handleAuthChange = () => checkAuth();
    const handleVisibility = () => {
      if (document.visibilityState === "visible") checkAuth();
    };
    const handleFocus = () => checkAuth();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") checkAuth();
    };

    window.addEventListener("authChange", handleAuthChange);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorage);
    };
  }, [checkAuth]);

 
  const isDarkMode = !isAuthPage && !scrolled;
  const navbarClasses = isDarkMode
    ? "bg-transparent text-white"
    : "bg-black text-white shadow-md";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center transition-all duration-300 ${navbarClasses}`}
      >
         <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-7 h-7 text-white" />
                      <Link href="/"  className="text-md font-bold text-white">E-Library</Link>
                    </div>

        <div className="space-x-6 hidden md:flex items-center">
          <Link href="/user/books" className="hover:underline">
            Books
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        {isLoggedIn ? (
          <div ref={profileRef}>
            <UserCircle
              onClick={() => setProfileOpen((prev) => !prev)}
              className={`w-8 h-8 cursor-pointer hover:opacity-75 ${
                isDarkMode ? "text-white" : "text-white"
              }`}
            />
          </div>
        ) : (
          <div className="space-x-3 flex items-center">
            <Link
              href="/user/login"
              className="px-4 py-2 border rounded-lg hover:bg-black"
            >
              Sign In
            </Link>
            <Link
              href="/user/signup"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Profile Drawer (anchored under profile icon) */}
      <ProfileDrawer
  isOpen={profileOpen}
  onClose={() => setProfileOpen(false)}
  anchorRef={profileRef}
/>

    </>
  );
}
