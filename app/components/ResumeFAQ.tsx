import React from 'react';

interface IntegrationSectionProps {
  question: string;
  subheading: string;
  bullets: string[];
  imageUrl?: string;
  reverse?: boolean;
}

const IntegrationSection: React.FC<IntegrationSectionProps> = ({
  question,
  subheading,
  bullets,
  imageUrl,
  reverse = false,
}) => {

  return (
    <section className="w-full py-8 px-5">
      <div className="max-w-6xl mx-auto">
        <div
          className={`flex flex-col lg:${reverse ? 'flex-row-reverse' : 'flex-row'} gap-12 items-center`}
        >
          {/* Text Content */}
          <div className="flex-1 space-y-4">
            <h1
              className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-[#0d2440]"
              style={{ color: 'rgb(27, 42, 65)' }}
            >
              {question}
            </h1>

            <p
              className="text-base sm:text-lg lg:text-xl leading-relaxed"
              style={{ color: 'rgb(76, 85, 100)' }}
            >
              {subheading}
            </p>

            <ul className="space-y-2.5">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2e2e99] flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span
                    className="text-base sm:text-lg lg:text-xl leading-relaxed"
                    style={{ color: 'rgb(76, 85, 100)' }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="flex-1 w-full relative">
            {imageUrl ? (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={question}
                  loading="lazy"
                  className="z-10 mx-auto max-w-full h-60 w-60 sm:h-60 sm:w-60 lg:h-90 lg:w-90"

                />
              </div>
            ) : (
              <div className="relative w-full aspect-[4/3] bg-white rounded-xl shadow-xl z-10 border border-gray-100" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================
   SEO-Friendly Benefits Section
========================= */

const QASection: React.FC = () => {
  return (
    <div className="bg-[#e7f0fa]/50 min-h-screen py-14">
      <div className="text-center mb-16 px-6">
        <h1
          className="text-4xl lg:text-5xl font-bold mb-4"
          style={{ color: 'rgb(27, 42, 65)' }}
        >
          Why This AI Resume <span className='bg-[#ffe8b1] px-2'>Evaluation Matters</span> for IT Jobs
        </h1>
        <p
          className="text-lg"
          style={{ color: 'rgb(76, 85, 100)' }}
        >
          An AI-powered resume analysis designed for Indian IT hiring, ATS screening, and real recruiter expectations.
        </p>
      </div>

      <IntegrationSection
        question="Deep technical and skill-based resume evaluation"
        subheading="Your resume is analyzed for technical skills, tools, and job-specific relevance not just ATS keywords."
        bullets={[
          'Technical depth across programming languages and frameworks',
          'Skill relevance for software, IT, and tech roles',
          'Practical capability evaluation beyond theory',
        ]}
        imageUrl="https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/1000209124-removebg-preview.png"
        reverse={false}
      />

      <IntegrationSection
        question="Project and experience-level resume assessment"
        subheading="Projects, internships, and academic experience are evaluated fairly for students and freshers."
        bullets={[
          'Project depth and real-world application',
          'Internship, training, and academic experience review',
          'Hands on work and tool usage recognition',
        ]}
        imageUrl="https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/1000209144-removebg-preview.png"
        reverse={true}
      />

      <IntegrationSection
        question="Industry capability aligned with current IT hiring trends"
        subheading="Your resume is checked against active Indian IT industry requirements and role expectations."
        bullets={[
          'Industry relevance score for IT and software roles',
          'Hiring trend data updated every 2 months',
          'Role-based skill and technology alignment',
        ]}
        imageUrl="https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/1000209146-removebg-preview.png"
        reverse={false}
      />

      <IntegrationSection
        question="Percentile-based resume scoring and comparison"
        subheading="Understand how your resume performs compared to thousands of real IT job applicants."
        bullets={[
          'Percentile score against similar candidate profiles',
          'Clear visibility of resume strengths and gaps',
          'Recruiter-style and ATS-aware evaluation',
        ]}
        imageUrl="https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/1000209150-removebg-preview.png"
        reverse={true}
      />

      <IntegrationSection
        question="Best-suited IT job role recommendations"
        subheading="Get AI-driven job recommendations based on your skills, projects, and experience level."
        bullets={[
          'AI-based job role and career matching',
          'Skill, project, and experience-driven suggestions',
          'Higher shortlist and interview success probability',
        ]}
        imageUrl="https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/1000209140-removebg-preview.png"
        reverse={false}
      />
    </div>
  );
};

export default QASection;
