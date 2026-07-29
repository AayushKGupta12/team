import { Metadata } from "next";
import FAQ from "./components/FAQ";
import Hero from "./components/Hero";
import Features from "./components/FeatureSection";
import HeroCTA from "./components/HeroCTA";
import YouTubePreview from "./components/Youtube";
import Updates from "./components/Updates";
import ToolsExplorer from "./components/ToolsExplorer";

/*
===============================================================================
                    UI/UX Contribution Guidelines
===============================================================================

This repository is intended ONLY for frontend and UI/UX contributions.

Who can contribute?
- Students
- Interns
- Open Source Contributors
- Contract Contributors

Allowed Changes
---------------
✅ UI/UX improvements
✅ New frontend components
✅ Styling enhancements
✅ Responsive design improvements
✅ Accessibility improvements
✅ Frontend performance optimizations

Not Allowed
-----------
❌ Backend modifications
❌ API changes
❌ Database changes
❌ Authentication logic changes
❌ Editing existing production pages or components without approval

Repository Structure
--------------------

Every contributor MUST create a separate folder inside the `app/` directory.

Example:

app/
├── page.tsx                  // Existing production page (Do NOT modify)
├── Aayush_Intern/
│   └── page.tsx
├── John_Doe/
│   └── page.tsx
├── Jane_Smith/
│   └── page.tsx

Rules
-----

1. Create a folder using your full name or assigned contributor name.

2. Place ALL your code inside your own folder.

3. Do NOT modify:
   - app/page.tsx
   - Existing production components
   - Shared layouts
   - Backend code

4. Your implementation should be accessible via:

   /Your_Folder_Name_Intern

Example:

   Folder/
   └── Aayush_Intern/
       └── page.tsx

Access it at:

   http://localhost:3000/Aayush_Intern

5. Keep your implementation self-contained.

6. Ensure the project builds successfully before submitting a Pull Request.

===============================================================================
*/

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