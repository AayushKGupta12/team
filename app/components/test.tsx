"use client";

import { motion, Variants } from "framer-motion";

/* ------------------ Typed Framer Motion Variants ------------------ */

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.30,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Testimonials() {
  return (
    <section className="py-12 bg-[#e7f0fa] sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Our Happy Clients
            </h1>
          </motion.div>

          <div className="relative mt-10 md:mt-24 md:order-2">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              />
            </div>

            {/* Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3"
            >
              {/* Card 1 */}
              <motion.div
                variants={cardVariants}
                className="flex flex-col overflow-hidden shadow-xl rounded-xl"
              >
                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-[#FDB241]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="mt-8">
                      <p className="text-lg leading-relaxed text-gray-900 font-pj">
                        "Everything was made clear by Advance resume analysis, which highlighted my gaps, highlighted my technical weekness and evaluated my experience and indicated which jobs I would be most suited for."</p>
                    </blockquote>

                    <hr className="mt-3" />
                  </div>

                  <div className="mt-3">
                    <p className="text-base font-bold text-gray-900 font-pj">
                      Riya Kumari
                    </p>
                    <p className="text-sm text-gray-600 font-pj">
                      Software Engineer @ Walmart
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                variants={cardVariants}
                className="flex flex-col overflow-hidden shadow-xl rounded-xl"
              >
                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-[#FDB241]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="mt-8">
                      <p className="text-lg leading-relaxed text-gray-900 font-pj">
                        "To be honest, it was the simplest IT job application process I've ever encountered. Just me, my resume, and the business, no additional steps or third party platforms."</p>
                    </blockquote>
                  </div>

                  <hr className="mt-3" />

                  <div className="mt-3">
                    <p className="text-base font-bold text-gray-900 font-pj">
                      Sanu Gupta
                    </p>
                    <p className="text-sm text-gray-600 font-pj">
                      Sr. Data Scientist @ Databricks
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                variants={cardVariants}
                className="flex flex-col overflow-hidden shadow-xl rounded-xl"
              >
                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-[#FDB241]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="mt-8">
                      <p className="text-lg leading-relaxed text-gray-900 font-pj">
                        "I was astounded by how simple it was to write a polished cover letter. The entire process was quick and easy thanks to the two step builder and recommened job profiles."</p>
                    </blockquote>
                  </div>

                  <hr className="mt-3" />

                  <div className="mt-3">
                    <p className="text-base font-bold text-gray-900 font-pj">
                      Shambhavi Kiran
                    </p>
                    <p className="text-sm text-gray-600 font-pj">
                      Product Manager @ Google
                    </p>
                  </div>
                </div>

                      


              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex justify-center md:col-span-3"
              >
                <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 border border-slate-200 shadow-sm">
                  {/* Stars */}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? "text-yellow-500" : "text-yellow-300"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-sm font-medium text-slate-700">
                    <span className="font-semibold text-slate-900">4.7</span> / 5
                    <span className="mx-1 text-slate-400">•</span>
                    Based on <span className="font-semibold">7,900+</span> ratings
                  </p>
                </div>
              </motion.div>
              

            </motion.div>
            
          </div>
          
        </div>
        
      </div>
      
    </section>
  );
}
