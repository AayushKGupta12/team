"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

interface Article {
  title: string;
  link: string;
  image_url: string;
  pubDate: string;
  description?: string;
  source_id?: string;
  category?: string[];
}

export default function FormalBlogGrid() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL;

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

        let allArticles: Article[] = [];

        responses.forEach((data) => {
          const withImage = (data.results || []).filter(
            (a: any) => a.image_url && a.image_url.trim() !== ""
          );
          allArticles.push(...withImage);
        });

        // Sort by date (newest first)
        allArticles.sort(
          (a, b) =>
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
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

  const getCategoryFromIndex = (index: number): string => {
    const categories = ["TECHNOLOGY", "SCIENCE", "BUSINESS", "MARKETS"];
    return categories[index % categories.length];
  };

  const formatReadTime = (description?: string): string => {
    if (!description) return "5 min read";
    const words = description.split(" ").length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  const displayed = articles.slice(0, 40);

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0b1724] 
                      leading-tight md:leading-none mt-12 md:mt-0 text-left">
            <span className="block">Insights that</span>
            <span className="text-[#2e5e99]">actually matter</span>
          </h1>
          
        </motion.div>

        {/* Blog Grid - 3 Columns with Equal Heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayed.map((article, index) => (
            <motion.article
              key={`${article.link}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group flex flex-col h-full"
            >
              {/* Image Container */}
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden rounded-t-lg aspect-[4/3] block"
              >
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  unoptimized
                  priority={index < 6}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>

              {/* Content Container - Fills remaining space */}
              <div className="bg-gray-100 p-5 rounded-b-lg flex flex-col flex-1">
                {/* Category Badge */}
                <span className="inline-block text-[10px] font-semibold tracking-wider text-gray-700 uppercase mb-2">
                  {article.category?.[0] || getCategoryFromIndex(index)}
                </span>

                {/* Title - Fixed height with line clamp */}
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight line-clamp-3 min-h-[4.5rem]">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-600 transition-colors duration-200"
                  >
                    {article.title}
                  </a>
                </h2>

                {/* Excerpt - Fixed height with line clamp */}
                {article.description ? (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[4rem]">
                    {article.description}
                  </p>
                ) : (
                  <div className="mb-4 min-h-[4rem]"></div>
                )}

                {/* Meta Information - Pushed to bottom */}
                <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 mt-auto border-t border-gray-200">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={article.pubDate}>
                      {new Date(article.pubDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatReadTime(article.description)}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Indicator */}
        {articles.length > displayed.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 text-sm">
              Showing {displayed.length} of {articles.length} articles
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}