"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Calendar, Sparkles } from "lucide-react";

export default function ModernTechGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchAll = async () => {
    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL;

      const endpoints = [
        `${API_BASE}/tech`,
        `${API_BASE}/science`,
        `${API_BASE}/stock`,
        `${API_BASE}/business`,
      ];

      const responses = await Promise.all(
        endpoints.map((url) =>
          fetch(url).then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch ${url}`);
            }
            return res.json();
          })
        )
      );

      let allArticles: any[] = [];

      responses.forEach((data) => {
        const withImage = (data.results || []).filter(
          (a: any) => a.image_url && a.image_url.trim() !== ""
        );
        allArticles.push(...withImage);
      });

      // Sort by date (newest first)
      allArticles.sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );

      setArticles(allArticles);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchAll();
}, []);


  // Staggered grid layout (optimized for beauty + performance)
  const getGridClasses = (index) => {
    const patterns = [
      "md:col-span-4 md:row-span-2",     // 0: Hero card
      "md:col-span-2",                   // 1
      "md:col-span-2",                   // 2
      "md:col-span-3",                   // 3
      "md:col-span-3",                   // 4
      "md:col-span-2",                   // 5
      "md:col-span-2",                   // 6
      "md:col-span-4",                   // 7: Wide
      "md:col-span-2",                   // 8
      "md:col-span-2",                   // 9
    ];
    return patterns[index % patterns.length] || "md:col-span-2";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e7f0fa] to-white">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-[#2e5e99] mx-auto mb-6" />
          <p className="text-2xl font-light text-[#0d2440]">Curating today’s top IT stories...</p>
        </div>
      </div>
    );
  }

  const displayed = articles.slice(0, 40);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbff] via-white to-[#e7f0fa] py-16 px-4 lg:px-8">
      {/* Hero Title – Premium */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 max-w-5xl mx-auto"
      >
        
        <div className="flex justify-center mt-2">
          <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-lg border border-[#7ba4d0]/20">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[#0d2440] font-medium text-2xl">{articles.length} fresh stories this hour</span>
          </span>
        </div>
      </motion.div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6 auto-rows-[280px]">
          {displayed.map((item, i) => (
            <motion.a
              key={`${item.link}-${i}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className={`
                relative group overflow-hidden rounded-3xl shadow-xl
                bg-white/50 backdrop-blur-sm border border-white/30
                ${getGridClasses(i)}
                ${i === 0 ? "md:row-span-2 md:col-span-4" : ""}
              `}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  fill
                  src={item.image_url}
                  alt={item.title}
                  unoptimized
                  priority={i < 6}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-2 md:p-8 text-white">
                

                <h3 className="text-xl md:text-xl font-bold leading-tight line-clamp-3">
                  {item.title}
                </h3>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 opacity-90">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(item.pubDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </div>
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* More Indicator */}
      {articles.length > displayed.length && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-20"
        >
          <p className="text-2xl text-[#0d2440]/70 font-medium">
            +{articles.length - displayed.length} more stories loading in the background
          </p>
        </motion.div>
      )}
    </div>
  );
}