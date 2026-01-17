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
    name: "Adrija Chatterjee",
    role: "React Developer",
    avatar: "https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/WhatsApp%20Image%202026-01-02%20at%2012.47.17%20PM.jpeg",
    avatarPosition: "center 20%",
    linkedin:"https://www.linkedin.com/in/adrija-chatterjee-054b13214",
    github: "https://github.com/Adrija21264/",
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
          <h2 id="team" className="text-5xl md:text-6xl font-bold text-[#0d2440] mb-6">
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


      {/* Apply Now – Stunning CTA */}
<div className="text-center py-25 bg-gradient-to-r from-[#ff5a57] to-[#e02f75] mt-8 rounded-3xl border border-amber-300 shadow-xl">

  {/* Heading */}
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
    🚀 Think you’d be a great fit?
  </h2>
  <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-10">
    Join our team that values curiosity, craftsmanship, and care. Your journey starts here.
  </p>

  {/* Centered Apply Button – preserved look */}
  <div className="mt-10 flex justify-center">
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLScUZ5y_RpNN9FXlm5U5ZtGaZuAmOeb_PDwldEUrMG6RO-lRXA/viewform?usp=publish-editor"
      target="_blank"
      rel="noopener noreferrer"
      className="border relative h-10 px-8 py-1 text-black text-2xl font-bold overflow-hidden bg-white rounded-3xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
    >
      Apply Now
    </a>
  </div>
  </div>
          
    </section>
  );
}