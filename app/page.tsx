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
// - UiUX Imporovement
// - Frontend Code modicatoin which does not require Backend changes / backend Involvement

// Sole auther : 
// - Students
// - Intern's
// - Contract COntributors

// How to add changes : Follow this method

// - Your code must be in a seperate route and must be in a "Folder" with your name and your changes must be in that folder only
// - to access your folder search Folder name in the "app" folder and add your changes in that folder only

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

// Some Development Environment Variables

// NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cGxlYXNhbnQtZG9nLTM5LmNsZXJrLmFjY291bnRzLmRldiQ
// CLERK_SECRET_KEY=sk_test_T8yaog7A8PoT3nr9mPpyuzq5BjdwEgajrs0wlcEef4
// CLERK_WEBHOOK_SECRET=whsec_i5U/hKtu5/jkMivO7VQZNDK+obeM8o9g
// CLERK_JWT_ISSUER=https://clerk.vfound.in


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