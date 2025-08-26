// components/ProfileDrawer.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLDivElement | null>; // 👈 reference to profile icon wrapper
}

export default function ProfileDrawer({ isOpen, onClose, anchorRef }: ProfileDrawerProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    const handleAuthChange = () => {
      const updated = localStorage.getItem("user");
      if (updated) {
        setUser(JSON.parse(updated));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen || !user) return null;

  return (
    <div
  ref={panelRef}
  className={`
    fixed right-4 z-50
    w-[50vw] max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 
    rounded-xl shadow-xl overflow-hidden
    transition-all duration-500 ease-in-out
    ${isOpen ? "max-h-[600px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-5"}
  `}
  style={{
    top: "64px", // 👈 same as navbar height
  }}
>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white hover:text-gray-200"
      >
        <X size={22} />
      </button>

      {/* Profile Info */}
      <div className="flex flex-col items-center pt-12 pb-6">
        <img
          src="https://i.pinimg.com/736x/e9/51/fa/e951fa717679b923d849231c08fd1214.jpg"
          alt="Profile"
          className="w-20 h-20 rounded-full mb-3 border-2 border-white/30 shadow-md"
        />
        <h2 className="text-lg font-bold text-white">{user.name}</h2>
        <p className="text-gray-300 text-sm">{user.email}</p>
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col px-6 pb-6 space-y-3">
        <button
          onClick={() => {
            onClose();
            router.push("/user/change-profile");
          }}
          className="w-full bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 border border-white/20 transition"
        >
          Change Profile
        </button>

        <button
          onClick={() => {
            onClose();
            router.push("/videos");
          }}
          className="w-full bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 border border-white/20 transition"
        >
          My Videos
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.dispatchEvent(new Event("authChange"));
            onClose();
            router.push("/");
          }}
          className="w-full bg-red-600/80 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
