"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Calendar } from "lucide-react";

export default function ModernTechGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const endpoints = [
          "https://edstack.onrender.com/tech",
          "https://edstack.onrender.com/science",
          "https://edstack.onrender.com/stock",
          "https://edstack.onrender.com/business",
        ];

        const responses = await Promise.all(
          endpoints.map((url) => fetch(url).then((res) => res.json()))
        );

        let allArticles = [];
        responses.forEach((data) => {
          const withImage = (data.results || []).filter(
            (a) => a.image_url && a.image_url.trim() !== ""
          );
          allArticles = [...allArticles, ...withImage];
        });

        setArticles(allArticles);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const getPosition = (index) => {
    const basePositions = [
      { row: 1, col: 1 },
      { row: 1, col: 3 },
      { row: 1, col: 5 },
      { row: 1, col: 7 },
      { row: 3, col: 2 },
      { row: 3, col: 4 },
      { row: 3, col: 6 },
      { row: 3, col: 8 },
      { row: 5, col: 1 },
      { row: 5, col: 3 },
      { row: 5, col: 6 },
    ];

    if (index < basePositions.length) {
      return basePositions[index];
    }

    const extraRow = Math.floor((index - 11) / 4) * 2 + 7;
    const extraCol = ((index - 11) % 4) * 2 + 1;
    return { row: extraRow, col: extraCol };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl font-light animate-pulse">
          Loading latest Spread...
        </div>
      </div>
    );
  }

  const displayed = articles.slice(0, 50);

  return (
    <div className="min-h-screen bg-white p-2">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl sm:text-7xl font-bold text-center mt-8 text-[#0d2440] kaushan-script-regular">
  What was that ?
</h2>

<p className="text-[#7ba4d0] text-4xl sm:text-7xl mt-4 kaushan-script-regular">
  Latest Happening In India Today
</p>

      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        {/* MOBILE OVERRIDE: grid-cols-1 */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-5 md:gap-7">
          {displayed.map((item, i) => {
            const pos = getPosition(i);
            if (!pos) return null;

            return (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`
                  group relative 
                  
                  /* MOBILE FALLBACK */
                  col-span-full 
                  row-auto

                  /* DESKTOP ORIGINAL POSITIONING UNCHANGED */
                  md:col-start-${pos.col} md:row-start-${pos.row} md:col-span-2
                  ${i === 4 || i === 8 ? "md:col-span-2" : ""}
                  ${i >= 9 && i < 11 ? "md:col-span-3" : ""}
                  ${i >= 11 ? "md:col-span-2" : ""}

                  h-60 md:h-65 lg:h-[340px]
                  rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl
                  transition-all duration-420
                `}
              >
                <div className="absolute inset-0">
                  <Image
                    fill
                    src={item.image_url}
                    alt={item.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-106"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                  <h3 className="text-lg font-semibold leading-tight line-clamp-3 mb-2 drop-shadow-lg">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-5 h-5" />
                      <span>
                        {new Date(item.pubDate).toLocaleDateString("en", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {item.source_icon && (
                      <Image
                        src={item.source_icon}
                        width={32}
                        height={32}
                        alt="Source"
                        className="rounded-full ring-2 ring-[#0d2440]"
                        unoptimized
                      />
                    )}
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Background blobs (unchanged) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-22 right-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-900" />
        </div>
      </div>

      {articles.length > displayed.length && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-20 text-gray-400 text-lg"
        >
          +{articles.length - displayed.length} more stories today
        </motion.p>
      )}
    </div>
  );
}
