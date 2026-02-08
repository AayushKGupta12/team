import ResumeHero from "../components/ResumeHero";
import ATSResumeCheckerApp from "../components/Analysis";
import CareerHealthDashboard from "../components/CareerHealthDashboard";
import ResumeFAQ from "../components/ResumeFAQ";
import FAQ from "../components/FAQ2";
import ResumeCTA from "../components/ResumeCTA";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth(); // 👈 Add await for Next.js 15+

  console.log("🔥 Page rendered with userId:", userId);

  return (
    <div>
      <ResumeHero />
      <ATSResumeCheckerApp />

      {userId ? (
        <div className="mt-12 px-4 max-w-7xl mx-auto">
          <CareerHealthDashboard clerkUserId={userId} />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Please sign in to view your career health dashboard
        </div>
      )}

      <ResumeFAQ />
      <FAQ />
      <ResumeCTA />
    </div>
  );
}