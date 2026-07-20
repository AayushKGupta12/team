import { Metadata } from "next";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import Features from "./components/FeatureSection";
import HeroCTA from "./components/HeroCTA";
import YouTubePreview from "./components/Youtube";
import Updates from "./components/Updates";
import ToolsExplorer from "./components/ToolsExplorer";

// Rule For Modification :
// THis Repo is solely ment for Modification relared to UIUX improvement
// -UiUX Imporovement
// - Frontend Code modicatoin which does not require Backend changes / backend Involvement

// SOle auther : 
// - Students
// - Intern's
// - Contract COntributors

// How to add changes : Follow this method

// - Your code must be in a seperate branch and must be in a separate folder with your name and your changes must be in that folder only

const Page = () => {
  return (
    <>
      <Hero />
      <YouTubePreview />
      <ToolsExplorer />
      <Features />
      <FAQ />
      <Updates />
      <HeroCTA />
    </>
  );
};

export default Page;


// NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
// CLERK_SECRET_KEY=
// CLERK_WEBHOOK_SECRET=

// CLERK_JWT_ISSUER=


// NEXT_PUBLIC_SUPABASE_URL=
// NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
// NEXT_PUBLIC_SUPABASE_ANON_KEY=
// SUPABASE_SERVICE_ROLE_KEY=

// LOGO_API_TOKEN=

// ADMIN_EMAILS=

// RESEND_API_KEY=
// EMAIL_FROM=

// NEXT_PUBLIC_API_URL=http://127.0.0.1:5000 [Must be your local Backend URL]

// RAZORPAY_KEY_ID=
// RAZORPAY_KEY_SECRET=
// NEXT_PUBLIC_RAZORPAY_KEY_ID=

// BLOCKED_EMAILS=