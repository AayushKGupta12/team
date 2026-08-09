# Tauzand Intelligence — Frontend Repository

> **AI Career Intelligence Platform for Engineering Students**
> 
> Open-source frontend codebase for [Tauzand.in](https://www.tauzand.in) — where students build real open-source projects, get mentor-backed code reviews, and transition from contributors to full-time engineers.

![Tauzand](https://img.shields.io/badge/Tauzand-Career%20Intelligence-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)
![Contributors](https://img.shields.io/badge/contributors-500%2B-blue)

---

## 🎯 About Tauzand

Tauzand is an **MSME-registered, Startup India-recognized** AI career intelligence platform serving 3000+ active contributors across India, the US, and Singapore.

### What We Build
- **iATS**: AI Resume Analyzer (3,00,000+ real IT resumes trained)
- **iCL**: Intelligent Cover Letter Generator
- **Open-Source Contributor Program**: Real production code contributions with mentor guidance
- **DSA Platform**: 800+ company-wise coding interview PYQs R&D Assistance
- **IT Jobs Board**: Fresh graduate hiring portal
- **AI Browser Extension**: Research assistant for any tab

### The Mission
This repository is part of our open-source initiative where contributors work on production software, get expert mentorship, and have a clear path to internships and full-time roles.

---

## 📦 What's in This Repo

This is the **frontend/client-side codebase** for Tauzand.in. It contains:

```
tauzand/
├── app/
├── public/                    # Static assets (images, icons)
├── styles/                    # Global CSS & Tailwind config
├── lib/                       # Utility functions, hooks, helpers
├── utils/                     # Common utilities
└── README.md                  # This file
```

### Tech Stack (Frontend)

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14+ (React 18+) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | Shadcn/ui, Lucide Icons |
| **State Management** | React Hooks, Context API |
| **API Client** | Fetch / Axios |
| **Build Tool** | Webpack (via Next.js) |
| **Deployment** | Vercel |
| **Chart Library** | Chart.js, Recharts |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AayushKGupta12/team.git
   cd team
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Required variables:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

### Key Directories

#### `/app`
Next.js App Router pages and layouts.

```
app/
├── components/
│   ├── InternshipHero.tsx    # Hero section (reusable)
│   ├── ProblemSection.tsx    # Problem/solution cards
│   ├── FAQ5.tsx              # FAQ accordion
│   ├── Navigation.tsx        # Top navigation & sidebar
│   └── Footer.tsx            # Footer component
└── page.tsx                # Page layout
└── layout.tsx                # Root layout
```

---

## 🎨 Component Architecture

### Reusable Components

All components are **TypeScript** with **Tailwind CSS** styling.

#### Example: Hero Section
```tsx
// app/components/InternshipHero.tsx
export default function InternshipHero() {
  const router = useRouter();
  
  return (
    <section className="w-full bg-white text-slate-900 py-28 px-6">
      {/* Hero content */}
    </section>
  );
}
```
---

## 🔧 Development Workflow

### Running Locally

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Lint and format
npm run lint
npm run format
```

### Git Workflow (For Contributors)

1. **Create a branch** for your feature
   ```bash
   git checkout -b feature/your-feature-name_[Designation | Provided by your mentor]
   ```

2. **Make changes** and commit
   ```bash
   git add .
   git commit -m "feat: describe your changes | your_name_ID"
   ```

3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name_[Designation | first_last_name]
   ```

4. **Open a Pull Request** to `main`
   - Describe changes clearly
   - Link any relevant issues
   - Include screenshots/GIFs for UI changes

---

## 📝 Coding Standards

### File Naming
- **Components**: PascalCase (`InternshipHero.tsx`)
- **Pages**: lowercase with hyphens (`open-source.tsx`)
- **Utilities**: lowercase with hyphens (`api-client.ts`)

### Component Structure
```tsx
"use client"; // If using client-side features

import { useState } from "react";
import type { ComponentProps } from "react";

interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export default function MyComponent({ title, onClick }: MyComponentProps) {
  const [state, setState] = useState(false);

  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

---

## 🔌 API Integration

### Environment Setup

Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.tauzand.in/v1
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Example API Call

```tsx
// lib/api/contributions.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getContributorProfile(userId: string) {
  const res = await fetch(`${API_BASE}/contributors/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
```

### Using in Components

```tsx
// app/open-source/userdashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getContributorProfile } from "@/lib/api/contributions";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getContributorProfile("user-id").then(setProfile);
  }, []);

  return <div>{/* Display profile */}</div>;
}
```

---

## 🧪 Testing

### Unit Tests
```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### E2E Tests
```bash
# Cypress
npm run e2e

# Playwright
npm run e2e:pw
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import the repository
   - Add environment variables
   - Deploy

3. **Live URL**: `https://tauzand.vercel.app`

### Build Optimization

```bash
# Analyze bundle size
npm run analyze

# Build report
npm run build -- --analyze
```

---

## 📚 Documentation

### Key Files

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — How to contribute to this repo
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Detailed project architecture
- **[STYLING.md](./STYLING.md)** — Design system & CSS guidelines
- **[API.md](./API.md)** — API endpoint documentation

---

## 🤝 Contributing

We welcome open-source contributions! Here's how to get involved:

### Steps to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m "feat: add amazing feature"`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open a Pull Request** with a clear description

### For Tauzand Contributors

If you're part of our **Open-Source Contributor Program**:

1. Check [/open-source/project](https://team-six-rosy.vercel.app/Folder) for assigned issues
2. Create a branch: `git checkout -b contrib/issue-number`
3. Implement the feature with mentor guidance
4. Submit your PR with proof of testing
5. Get code review from assigned mentor
6. Once approved, merge to `main`

### Code Review Process

- ✅ Code must pass linting (`npm run lint`)
- ✅ All new features need tests
- ✅ Components must be TypeScript
- ✅ Styling only via Tailwind CSS
- ✅ Commit messages follow Conventional Commits
- ✅ PR description explains changes clearly

---

## 📊 Performance

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Optimization Strategies
- Image optimization with Next.js `<Image>`
- Code splitting at route level
- CSS-in-JS via Tailwind for minimal bundle
- Lazy loading for below-fold components

---

## 🔐 Security

### Best Practices
- ✅ No sensitive data in frontend code
- ✅ All API keys in environment variables
- ✅ CORS headers properly configured
- ✅ XSS protection via React's built-in sanitization
- ✅ CSP headers in `next.config.js`

### Reporting Security Issues
Please **do not** create public issues for security vulnerabilities. Email: [security@tauzand.in](mailto:security@tauzand.in)

---

## 📞 Support & Community

- **Twitter/X**: [@tauzand](https://x.com/tauzand)
- **LinkedIn**: [Tauzand Company](https://www.linkedin.com/company/tauzand)
- **GitHub Issues**: Use [GitHub Issues](https://github.com/AayushKGupta12/team/issues) for bugs

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) file.

**Copyright © 2026 Tauzand Intelligence. All rights reserved.**

---

## 👥 Contributors

[View all contributors](https://github.com/AayushKGupta12/team/graphs/contributors)

---

## 🙏 Acknowledgments

- **Next.js** community for the amazing framework
- **Tailwind CSS** for the utility-first styling system
- **Shadcn/ui & Framer motion** for accessible component library
- All **17+ expert mentors** guiding contributors
- Every **contributor** shipping real code to production

---

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

---

<div align="center">

**Made with ❤️ by the Tauzand Community**

[Visit Tauzand.in](https://www.tauzand.in) • [Open-Source Program](https://www.tauzand.in/open-source) • [Contribute Now](https://github.com/AayushKGupta12/team)

</div>
