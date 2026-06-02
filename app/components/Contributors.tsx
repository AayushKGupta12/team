'use client';

import { Shield, Award, Sparkles, Lightbulb} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────
interface Person {
  name: string;
  title: string;
  subtitle?: string;
  description: string;
}

interface ValueItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const founders: Person[] = [
  {
    name: 'Aayush K. Gupta',
    title: 'Founder & Chief Executive Officer (CEO)',
    subtitle: 'Corporate strategy, vision, and high-level decision-making.',
    description:
      'Aayush Gupta shapes the long-term vision of Tauzand. He specializes in microservices, scalable backend architecture, applying clean code, SOLID principles, and optimized databases built for enterprise growth.',
  },
  {
    name: 'Archana Gupta',
    title: 'Founder & Chief Financial Officer (CFO)',
    subtitle: 'Financial health, capital allocation, and fiscal planning.',
    description:
      'Archana handles corporate capital orchestration and scaling strategies. Her forward-thinking financial frameworks drive sustained infrastructure growth, corporate compliance, and strategic partnership planning.',
  },
];

const seniorLeadership: Person[] = [
  {
    name: 'Durgesh Panda',
    title: 'Technical HR',
    subtitle: 'Talent acquisition, technical vetting, and team scaling.',
    description: 'Durgesh spearheads technical recruitment and engineering pipeline design, ensuring team alignment with core architectural goals and scaling culture effectively.',
  },
  {
    name: 'Avneet Singhla',
    title: 'Mentor & Business Executive at Tauzand',
    subtitle: 'Corporate strategy, executive guidance, and commercial growth.',
    description: 'Avneet provides strategic oversight and business mentorship, aligning product initiatives with broader market opportunities to drive long-term institutional growth.',
  },
  {
    name: 'Chawla Gupta',
    title: 'Mentor at Tauzand',
    subtitle: 'Academic direction, engineering mindset, and skills development.',
    description: 'Chawla guides internal engineering talent, helping translate complex algorithmic concepts into practical framework implementations and professional milestones.',
  },
  {
    name: 'Avishikta Anand',
    title: 'Mentor at Tauzand',
    subtitle: 'Career roadmapping, leadership strategy, and skill optimization.',
    description: 'Avishikta delivers dedicated mentorship focused on product execution, cross-functional collaboration, and preparing team members for high-impact engineering delivery.',
  },
];

const Engineers: Person[] = [
  {
    name: 'Atmav Gaurav',
    title: 'Frontend Engineer',
    subtitle: 'Component systems, interface design, and client-side performance.',
    description: 'Atmav engineers highly interactive Web interfaces utilizing modern frontend frameworks, optimizing core web vitals and overall responsive performance.',
  },
  {
    name: 'Neha Singh',
    title: 'Legal Advisor',
    subtitle: 'IPR frameworks, advocacy, and technology regulations.',
    description: 'Neha directs legal framework adherence, manages corporate compliance pipelines, and secures intellectual property assets for the underlying tech platform.',
  },
  {
    name: 'Aarav Mukherjee',
    title: 'Data Engineer',
    subtitle: 'ETL orchestration, schema design, and analytical warehousing.',
    description: 'Aarav models secure, low-latency data pipelines and warehousing systems, transforming raw telemetry into clean datasets for optimization processing.',
  },
  {
    name: 'Shreya Sharma',
    title: 'DevOps Engineer',
    subtitle: 'CI/CD automation, cloud architecture, and build pipelines.',
    description: 'Shreya builds automated orchestration layers and deployment strategies, maintaining high availability across staging and runtime infrastructure.',
  },
  {
    name: 'Jhanvi Pandey',
    title: 'Machine Learning & AI Engineer',
    subtitle: 'Design LLMs, pipeline, and model training',
    description: 'Jhanvi bridges the gap between design concepts and implementation, building unified structural patterns for seamless user experience journeys.',
  },
  {
    name: 'Vaishnavi Singh',
    title: 'Site Reliability Engineer',
    subtitle: 'System uptime, incident response, and performance monitoring.',
    description: 'Vaishnavi ensures core service infrastructure stability, managing traffic failovers, latency degradation patterns, and active cluster health monitoring.',
  },
  {
    name: 'Smruti Shiksha',
    title: 'UI/UX and Graphic Designer',
    subtitle: 'Brand identity, creative art, and visual wireframes.',
    description: 'Smruti designs comprehensive design systems and visual brand components, ensuring absolute aesthetic consistency across all public web interfaces.',
  },
  {
    name: 'Shreya Thakur',
    title: 'Backend Engineer',
    subtitle: 'API scaling, database structures, and business logic processing.',
    description: 'Shreya engineers distributed backend APIs and optimizes database queries, handling core storage layer integrations with a focus on concurrent processing.',
  },
  {
    name: 'Snehashish Dutta',
    title: 'QA Automation Engineer',
    subtitle: 'End-to-end testing, assertion scripts, and bug tracking.',
    description: 'Snehashish programs rigorous regression suites and integration testing tools to systematically guarantee application quality prior to primary production deployments.',
  },
  {
    name: 'Abhigyan Anand',
    title: 'Lead Communication Engineer',
    subtitle: 'Network topologies, realtime protocols, and signal streaming.',
    description: 'Abhigyan optimizes lower-level networking layouts and communication channels, achieving minimal latency overhead during packet routing and processing.',
  },
  {
    name: 'Astha Singh',
    title: 'Content Creator',
    subtitle: 'Technical writing, content management, and platform copy.',
    description: 'Astha writes clear informational copy and guides, translating highly technical framework features into readable platform copy and educational documentation.',
  },
];

const values: ValueItem[] = [
  {
    icon: Shield,
    title: 'Transparency',
    description: "Honest pricing, clear disclosures, and open audit trails. What you see is what's shipping.",
  },
  {
    icon: Award,
    title: 'Integrity',
    description: 'We do the right thing — for customers, for recipients of communications, and for the regulators who keep the ecosystem safe.',
  },
  {
    icon: Sparkles,
    title: 'Simplicity',
    description: "One platform, one contract, one bill. CPaaS that doesn't need a solutions-architecture deck to get started.",
  },
  {
    icon: Lightbulb,
    title: 'Performance',
    description: 'Sub-second latency, 99.9% uptime, and real-time scale. Communication-critical workloads deserve communication-grade infrastructure.',
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="border border-slate-300 bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-xl">
      <div>
        <div className="mb-4">
          <p className="text-lg font-bold text-[#0d2440] tracking-tight">
            {person.name}
          </p>
          <p className="text-xs font-semibold text-[#2e5e99] tracking-wide uppercase mt-1">
            {person.title}
          </p>
          {person.subtitle && (
            <p className="text-xs font-medium text-slate-500 mt-1 leading-snug">
              {person.subtitle}
            </p>
          )}
        </div>
        <p className="text-sm text-slate-500 leading-relaxed font-normal">
          {person.description}
        </p>
      </div>
    </div>
  );
}

// ── Main Page Component ────────────────────────────────────────────────────
export default function Contributors() {
  return (
    <main className="bg-white min-h-screen selection:bg-blue-50 selection:text-blue-700 font-sans antialiased">
      
      {/* ── Section: Mission & Story ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        
        <div className='max-w-3xl mx-auto px-6 pt-12 pb-12'>
          <h2 className='font-bold text-6xl pb-12'>
          We built the platform we wished existed.
          </h2>
          Tauzand ( ie. Formerely Vfound.in )  is a AI Based Career Platform as a Service. It's operated by Tauzand Career Intelligence, a Delaware corporation, wholly-owned by <span className="font-bold font-mono">Aayush IT & Services (UDYAM-BR-26-0222297)</span> an India-based software and AI company with a years of experience shipping enterprise-grade systems.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="border border-gray-400 bg-white rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              Our mission
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed font-normal">
              Software solutions designed to optimize operations and drive measurable 
              career growth. Aayush It & Services has delivered innovative software and 
              AI systems across technology, automations, and chrome extensions for years — Tauzand is 
              the SaaS product of that experience, purpose-built for Students that live 
              on IT Engineering.
            </p>
          </div>

          {/* Story Card */}
          <div className="border border-slate-400 bg-white rounded-3xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              Our story
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed font-normal">
              We kept watching IT under-graduates glue together on a CV, a Resume, an internship and half a dozen AI opportunities & solutions — then spend weeks reconciling 
              the data between them. So we built one platform with all of it, operated by 
              a our team as Indian organization for gaining career velocity. 
            </p>
          </div>
        </div>
      </section>

      {/* ── Section: Core Corporate Values ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            What we value
          </h2>
          <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed">
            Four principles, borrowed from Aayush IT & Services, that run through every Tauzand decision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => {
            const IconComponent = v.icon;
            return (
              <div key={v.title} className="border border-slate-300 bg-white rounded-2xl p-6 shadow-md flex flex-col items-start hover:scale-105 transition duration-200 ">
                <div className="p-2.5 rounded-xl text-[#0d2440] bg-[#7ba4d0]/50 mb-5">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-bold text-slate-900 tracking-tight mb-2">
                  {v.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-normal">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section: Founders & C-Suite ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-bold tracking-widest uppercase border rounded-full px-3.5 py-1 bg-yellow-200">
            Founders &amp; Executive Board
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4 mb-2">
            The Executive Team
          </h2>
          <p className="text-slate-500 text-sm">
            The architecture and strategic minds steering Tauzand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {founders.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>
      </section>

      {/* ── Section: Senior Leadership ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-bold tracking-widest uppercase border rounded-full px-3.5 py-1 bg-yellow-200">
            Senior Leadership
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4 mb-2">
            Running the platform
          </h2>
          <p className="text-slate-500 text-sm">
            Core leadership team members driving operations and technical advisory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {seniorLeadership.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>
      </section>

      {/* ── Section: Engineering Corps ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-bold tracking-widest uppercase border rounded-full px-3.5 py-1 bg-yellow-200">
            Engineering &amp; Core Operations
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4 mb-2">
            The Creators
          </h2>
          <p className="text-slate-500 text-sm">
            The systems engineers, design experts, and legal minds behind product shipment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Engineers.map((p) => (
            <PersonCard key={p.name} person={p} />
          ))}
        </div>
      </section>

      {/* ── Section: Action CTA Block ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        <div className="rounded-3xl bg-slate-950 px-8 py-16 text-center shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Think you'd be a great fit?
          </h3>
          <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
            Join our team that values curiosity, craftsmanship, and system optimization. Your journey starts here.
          </p>
          <a
            href="/careers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-slate-950 hover:bg-slate-50 text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-150"
          >
            Apply Now
          </a>
        </div>
      </section>
    </main>
  );
}