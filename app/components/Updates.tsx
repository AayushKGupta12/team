import React from 'react';
import Link from 'next/link';

interface UpdateItem {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  size: 'large' | 'medium' | 'small';
  href: string; // Added custom href for each item
}

const updates: UpdateItem[] = [
  {
    id: '1',
    category: 'Quaterly Result',
    title: 'Tauzand.in reaches 74,000 active users.',
    description: 'We’ve hit a major milestone with 74,000 active users on Tauzand.in! This growth reflects the value we’re providing to job seekers and professionals in the IT industry. With the launch of our AI Resume Analyzer and new features on the horizon, we’re excited to continue this journey of empowering careers.',
    date: 'April 2026',
    size: 'large',
    href: '/news/Q1-result-2026-great-start'
  },
  {
    id: '2',
    category: 'Product',
    title: 'Vfound has rebranded itself to Tauzand.in',
    description: 'We are thrilled to announce that Vfound has rebranded itself to Tauzand.in! This change reflects our commitment to providing a more personalized and engaging experience for our users.',
    date: 'March 2026',
    size: 'medium',
    href: '/news/vfound-has-rebranded-itself-to-tauzand'
  },
  {
    id: '3',
    category: 'We are Hiring',
    title: 'Join Our Team!',
    description: 'We’re looking for passionate engineers to help us build the future of career intelligence. Across roles in Ui/UX & Proton.JS',
    date: 'April 2026',
    size: 'medium',
    href: '/careers'
  },
];

const UpdateCard = ({ update }: { update: UpdateItem }) => {
  // Logic to handle the 4-column Bento layout spans
  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2 min-h-[420px]',
    medium: 'md:col-span-2 md:row-span-1 min-h-[200px]',
    small: 'md:col-span-1 md:row-span-1 min-h-[200px]',
  };

  return (
    <Link 
      href={update.href}
      className={`${sizeClasses[update.size]} px-8 group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 p-8 transition-all hover:border-gray-900 hover:shadow-sm`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] bg-yellow-200 rounded-2xl px-2 font-semibold uppercase tracking-[0.2em] text-gray-700">
            {update.category}
          </span>
          <span className="text-[12px] text-gray-700">{update.date}</span>
        </div>
        
        <h3 className="mt-6 text-2xl font-medium tracking-tight text-gray-900 group-hover:text-black">
          {update.title}
        </h3>
        
        <p className="mt-3 text-sm leading-relaxed text-gray-500 line-clamp-3">
          {update.description}
        </p>
      </div>

      <div className="flex items-center justify-end">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50 transition-colors group-hover:bg-black group-hover:text-white">
          <svg 
            width="15" 
            height="15" 
            viewBox="0 0 15 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default function AnnouncementPage() {
  return (
    <div className="min-h-screen px-8 py-24 text-black selection:bg-black selection:text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 space-y-4">
          <h1 className="text-5xl font-semibold tracking-tighter sm:text-7xl">
            Read More
          </h1>
          <p className="max-w-md text-lg text-gray-500">
            Insights, milestones, and the latest news from the Tauzand.in engineering team.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-flow-dense">
          {updates.map((item) => (
            <UpdateCard key={item.id} update={item} />
          ))}
        </div>
      </div>
    </div>
  );
}