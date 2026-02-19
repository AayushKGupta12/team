"use client";

import Image from "next/image";
import {
  Settings2,
  ThumbsUp,
  LayoutGrid,
  Zap,
  User,
  BarChart3,
  Chrome,
} from "lucide-react";

export default function PortfolioCTA() {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-15">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGE GRID */}
        <div className="grid grid-cols-2 gap-5">
          <ImageCard
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
            title="Real-Time Analytics"
            desc="Monitor usage, performance & activity instantly"
          />
          <ImageCard
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80"
            title="Seamless Integration"
            desc="Works smoothly with modern web platforms"
          />
          <ImageCard
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
            title="AI-Powered Assistance"
            desc="Automate tasks and boost efficiency"
          />
          <ImageCard
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
            title="Secure & Reliable"
            desc="Built with privacy and performance in mind"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight mb-4">
              Smart Browser Extension Built for Productivity & Insights
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our intelligent extension seamlessly integrates with your browser
              to deliver real-time insights, automated workflows, and performance
              tracking — helping you work smarter, faster, and more efficiently.
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <Feature icon={<Settings2 size={22} />} text="Simplify Account Changes" />
            <Feature icon={<ThumbsUp size={22} />} text="Easy to Customize" />
            <Feature icon={<LayoutGrid size={22} />} text="Various Categories" />
            <Feature icon={<Zap size={22} />} text="Lightning Fast" />
            <Feature icon={<User size={22} />} text="Accurate Insights" />
            <Feature icon={<BarChart3 size={22} />} text="Maximize Results" />
          </div>
        </div>
      </div>


      <section className="mt-32 px-6 lg:px-8">

      <div className="relative overflow-hidden bg-emerald-600 rounded-3xl px-10 py-16 shadow-xl">


        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-teal-400 opacity-30 blur-3xl rounded-full" />

        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-300 opacity-30 blur-3xl rounded-full" />


        <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">


          {/* LEFT CONTENT */}
          <div>


            <h2 className="text-4xl font-bold text-white mb-6">

              Supercharge Your Productivity

            </h2>


            <p className="text-emerald-50 text-lg mb-10 max-w-xl">

              Unlock real-time placement insights, automate tracking,
              and integrate seamlessly with vfound — built for developers
              and ambitious students.

            </p>



            {/* BUTTON GROUP */}
            <div className="flex flex-wrap gap-4">


              {/* Download Button */}
              <a
                href="#"
                target="_blank"
                className="
                  bg-white
                  text-emerald-600
                  font-semibold
                  px-8 py-4
                  rounded-xl
                  shadow-lg
                  hover:scale-105
                  hover:shadow-2xl
                  transition
                "
              >

                Download Extension

              </a>



              {/* API Docs Button */}
              <a
                href="/extension/api-doc"
                target="_blank"
                className="
                  bg-transparent
                  border border-white
                  text-white
                  font-semibold
                  px-8 py-4
                  rounded-xl
                  hover:bg-white
                  hover:text-emerald-600
                  transition
                "
              >

                API Docs

              </a>


            </div>


          </div>



          {/* RIGHT ICON */}
          <div className="relative flex justify-end items-center">

            <div className="relative">

              <Chrome
                size={320}
                className="text-gray-900 opacity-10 -right-40"
              />

              {/* Soft Glow Effect */}
              <div className="absolute -z-10 right-10 w-48 h-48 bg-indigo-400 opacity-20 blur-3xl rounded-full" />

            </div>

          </div>



        </div>


      </div>


    </section>
    </section>
  );
}

interface ImageCardProps {
  src: string;
  title: string;
  desc: string;
}

function ImageCard({ src, title, desc }: ImageCardProps) {
  return (
    <div className="relative h-[180px] w-full overflow-hidden rounded-2xl shadow-sm group cursor-pointer">
      {/* IMAGE */}
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-xs"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* TEXT */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-500">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-white/80 text-sm">{desc}</p>
      </div>
    </div>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  text: string;
}

function Feature({ icon, text }: FeatureProps) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="bg-white text-indigo-600 p-3 rounded-xl shadow-sm group-hover:shadow-md transition">
        {icon}
      </div>
      <span className="text-gray-700 font-medium text-base">{text}</span>

      <div>
      </div>
    </div>

  );
}