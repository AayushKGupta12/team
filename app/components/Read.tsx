'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  slug: string;
  imageAlt: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to write content about your photographs',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quis auctor odio arcu et dolor.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    category: 'Growth',
    readTime: '7 Mins Read',
    slug: 'write-content-photographs-1',
    imageAlt: 'Two people collaborating on photography content'
  },
  {
    id: '2',
    title: 'How to write content about your photographs',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quis auctor odio arcu et dolor.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    category: 'Growth',
    readTime: '7 Mins Read',
    slug: 'write-content-photographs-2',
    imageAlt: 'Modern interior design with blue chair'
  },
  {
    id: '3',
    title: 'How to write content about your photographs',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quis auctor odio arcu et dolor.',
    image: 'https://images.unsplash.com/photo-1615970392395-e0c5e37deb69?w=800&q=80',
    category: 'Growth',
    readTime: '7 Mins Read',
    slug: 'write-content-photographs-3',
    imageAlt: 'Artistic portrait photography'
  },
  {
    id: '4',
    title: 'How to write content about your photographs',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quis auctor odio arcu et dolor.',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&q=80',
    category: 'Growth',
    readTime: '7 Mins Read',
    slug: 'write-content-photographs-4',
    imageAlt: 'Minimalist product photography'
  },
  {
    id: '5',
    title: 'How to write content about your photographs',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quis auctor odio arcu et dolor.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    category: 'Growth',
    readTime: '7 Mins Read',
    slug: 'write-content-photographs-5',
    imageAlt: 'PayPal logo product photography'
  },
  {
    id: '6',
    title: 'How to write content about your photographs',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quis auctor odio arcu et dolor.',
    image: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=800&q=80',
    category: 'Growth',
    readTime: '7 Mins Read',
    slug: 'write-content-photographs-6',
    imageAlt: 'Robot toy photography'
  },
  {
    id: '7',
    title: 'How to write content about your photographs',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quis auctor odio arcu et dolor.',
    image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=800&q=80',
    category: 'Growth',
    readTime: '7 Mins Read',
    slug: 'write-content-photographs-7',
    imageAlt: 'Product packaging photography'
  },
  {
    id: '8',
    title: 'How to write content about your photographs',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit quis auctor odio arcu et dolor.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
    category: 'Growth',
    readTime: '7 Mins Read',
    slug: 'write-content-photographs-8',
    imageAlt: 'Sneaker photography on display'
  }
];

const Read: React.FC = () => {
  return (
    <section className="bg-gray-50 py-35 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0b1724] 
                      leading-tight md:leading-none mt-12 md:-mt-20 text-left">
            <span className="block">Latest Learning's</span>
            <span className="text-[#2e5e99]">for Developers</span>
          </h1>
          
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content Container */}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  <a href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </a>
                </h2>
                
                <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="font-medium">{post.category}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
                    aria-label={`Read more about ${post.title}`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Read;