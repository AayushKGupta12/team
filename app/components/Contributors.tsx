'use client';

import Image from 'next/image';
import { Github, Linkedin, Globe } from 'lucide-react';

interface Contributor {
  name: string;
  role: string;
  avatar: string;
  github?: string;
  linkedin?: string;
  website?: string;
  avatarPosition: string;
}

const contributors: Contributor[] = [
  {
    name: "Satwik Chandra",
    role: "Frontend Developer",
    avatar:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/caf46190-df42-40fc-94ae-daa6e77b4fe2.jpg",
    avatarPosition: "center 25%",
    github: "https://github.com/SATWIKKKKK",
    linkedin: "https://www.linkedin.com/in/satwikchandra",
  },
  {
    name: "Debasmita Pahari",
    role: "UI/UX & Graphic Designer",
    avatar:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/f3ec5818-be86-41fa-b20b-3b481bfb54aa.jpg",
    avatarPosition: "center 60%",
    linkedin: "https://www.linkedin.com/in/debasmita-pahari-74104a378/",
    website:
      "https://drive.google.com/file/d/1qUlYLv05p_jJhAIf3nFlHDiz3ROjcDut/view",
    github: "https://github.com/Debasmita1904",
  },
  {
    name: "Shreya Sharma",
    role: "Backend Engineer",
    avatar: "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/c9c79721-2d6d-46bf-a8c5-6bf37406136c.jpg",
    avatarPosition: "center 20%",
    github: "",
  },

  {
    name: "Adrija Chatterjee",
    role: "React Developer",
    avatar: "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/WhatsApp%20Image%202026-01-02%20at%2012.47.17%20PM.jpeg",
    avatarPosition: "center 20%",
    linkedin:"https://www.linkedin.com/in/adrija-chatterjee-054b13214",
    github: "https://github.com/Adrija21264/",
  },

  {
    name: "Aayush Gupta",
    role: "Software Engineering",
    avatar: "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/c75e76a8-3fd9-4f9c-95b1-29839a58e631.jpg",
    avatarPosition: "center 80%",
    linkedin: "https://www.linkedin.com/in/aayush-kumar-gupta-2b7952219",
    website: "https://aayushkgupta12.netlify.app/",
  },
  {
    name: "Khushbu Kumari",
    role: "Content Writer",
    avatar:
      "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/986025fa-8b8f-450d-803b-de9c3a306c0d.jpg",
    avatarPosition: "center 25%",
    linkedin: "https://www.linkedin.com/in/khushbu-kumari-068b18286",
    github: "https://github.com/Raykhushbu15",
  },
  {
    name: "Rajat Raj Shah",
    role: "Product Designer",
    avatar: "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/WhatsApp%20Image%202026-01-02%20at%208.50.30%20AM.jpeg",
    avatarPosition: "center 20%",
    linkedin: "https://www.linkedin.com/in/rajat-raj-shah",
    github: "https://github.com/Rajat101010",
    website: "https://www.rajatrajshah.com.np",
  },
];


export default function Contributors() {
  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white to-[#f8fbff]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-[#0d2440] mb-6">
            Meet Our Developers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A passionate team of developers, designers, and creators working together to build something amazing.
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contributors.map((contributor, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              {/* Avatar */}
<div className="relative mx-auto w-32 h-32 mb-4 rounded-full overflow-hidden bg-gray-100">
  {contributor.avatar ? (
    <Image
      src={contributor.avatar}
      alt={contributor.name}
      fill
      sizes="128px"
      style={{
        objectFit: "cover",
        objectPosition: contributor.avatarPosition || "center 20%",
      }}
      className="
        rounded-full
        ring-4 ring-gray-100
        group-hover:ring-[#ffd77a]
        transition-all duration-300
      "
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-gray-400 font-semibold">
      {contributor.name.charAt(0)}
    </div>
  )}
</div>


              {/* Name & Role */}
              <h3 className="text-2xl font-bold text-[#0d2440] mb-2">
                {contributor.name}
              </h3>
              <p className="text-lg text-[#2e5e99] mb-5">{contributor.role}</p>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-5">
                {contributor.github && (
                  <a
                    href={contributor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition-colors"
                    aria-label={`${contributor.name}'s GitHub`}
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {contributor.linkedin && (
                  <a
                    href={contributor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition-colors"
                    aria-label={`${contributor.name}'s LinkedIn`}
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {contributor.website && (
                  <a
                    href={contributor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition-colors"
                    aria-label={`${contributor.name}'s website`}
                  >
                    <Globe className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-20">

          <p className="text-lg text-gray-700 italic font-bold">
           “Building vfound wasn’t just about code, it was about creating something
            that genuinely helps students take their first career step.”
          </p>

          <p className="text-xl text-gray-600 font-medium mt-2">
            Thank you to every contributor who made vfound.in better.
          </p>
        </div>
      </div>
    </section>
  );
}