"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Book,
  FlaskConical,
  PenTool,
  Globe,
  Music,
  GraduationCap,
  Atom,
} from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  created_at: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Fiction: <Book className="w-6 h-6 text-white" />,
  Science: <FlaskConical className="w-6 h-6 text-white" />,
  Biography: <PenTool className="w-6 h-6 text-white" />,
  Travel: <Globe className="w-6 h-6 text-white" />,
  Music: <Music className="w-6 h-6 text-white" />,
  Education: <GraduationCap className="w-6 h-6 text-white" />,
  Technology: <Atom className="w-6 h-6 text-white" />,
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("http://localhost:8000/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="py-20 max-w-6xl mx-auto px-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Categories</h2>
          <p className="mb-4 text-gray-200">
            Discover books across a wide range of categories. From timeless
            classics to modern innovations, there’s something here for everyone.
          </p>
          <p className="mb-6 text-gray-300">
            Whether you’re into science, fiction, or biographies, dive into
            collections curated to inspire and expand your knowledge.
          </p>
          <Link href="/books">
            <button className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-lg hover:bg-white/30 transition">
              Explore All
            </button>
          </Link>
        </div>

        {/* Right - Static Circle */}
        <div className="relative mx-auto w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem]">
          {categories.map((cat, i, arr) => {
            const angle = (i / arr.length) * 2 * Math.PI;
            const radius = 120;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="absolute flex flex-col items-center group"
                style={{
                  top: `calc(50% + ${y}px - 40px)`,
                  left: `calc(50% + ${x}px - 40px)`,
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -8, 8, -8, 0],
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-white/30
                    bg-gradient-to-br from-gray-800 to-black
                    flex items-center justify-center
                    transition group-hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                >
                  {categoryIcons[cat.name] || (
                    <span className="text-sm font-semibold text-white">
                      {cat.name[0]}
                    </span>
                  )}
                </motion.div>
                <span className="mt-2 text-sm text-gray-200 group-hover:text-white transition">
                  {cat.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
