# Integration Guide - Code of Contribution Page

## Prerequisites

Ensure your Next.js project has:
- Node.js 18+ installed
- Next.js 14+ (app router)
- Tailwind CSS configured
- TypeScript enabled

---

## Step-by-Step Integration

### Step 1: Install Required Dependencies

```bash
# Install Lucide React for icons
npm install lucide-react
# or
yarn add lucide-react
# or
pnpm add lucide-react
```

### Step 2: Copy Component File

Copy `CodeOfContributionPage.tsx` to your project:

```bash
# Example path structure
cp CodeOfContributionPage.tsx app/code-of-contribution/page.tsx
```

### Step 3: Verify File Paths

Update the import statements if your component paths differ:

```typescript
// Current (may need adjustment)
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Update to match your project structure
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
```

### Step 4: Update Navigation Links

Add link to your navigation/header component:

```typescript
// In your Navbar or Header component
<Link href="/code-of-contribution">
  Code of Contribution
</Link>

// Or in your navigation menu
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Code of Contribution', href: '/code-of-contribution' },
  // ... other items
]
```

### Step 5: Test Locally

```bash
# Start development server
npm run dev

# Navigate to
# http://localhost:3000/code-of-contribution
```

### Step 6: Build & Deploy

```bash
# Build for production
npm run build

# Test production build
npm run start

# Deploy to Vercel
vercel deploy
```

---

## Directory Structure

After integration, your project should look like:

```
your-project/
├── app/
│   ├── page.tsx                          # Home page
│   ├── code-of-contribution/
│   │   └── page.tsx                      # ← CodeOfContributionPage.tsx
│   └── ...
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── public/
│   ├── images/
│   │   ├── hero.jpg
│   │   └── ...
│   └── ...
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── ...
```

---

## Tailwind Configuration

Verify `tailwind.config.ts` includes the content path:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        blue: {
          50: '#eff6ff',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Environment Variables Setup

Create `.env.local` in project root:

```bash
# .env.local (Local development only)
# Never commit this file

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_GITHUB_REPO=https://github.com/AayushKGupta12/team
NEXT_PUBLIC_DEPLOYMENT_URL=https://team-six-rosy.vercel.app/
```

Add to `.gitignore`:

```bash
# .gitignore
.env
.env.local
.env.*.local
```

---

## Verifying Installation

### Check TypeScript

```bash
# Verify no TypeScript errors
npm run type-check
# or
npx tsc --noEmit
```

### Build Test

```bash
# Test production build
npm run build

# Should output:
# ✓ All checks passed
# ✓ Build successful
```

### Run Locally

```bash
npm run dev

# Visit: http://localhost:3000/code-of-contribution
```

---

## Customization Examples

### Changing the Route

If you want a different URL path:

```bash
# Current: /code-of-contribution
# To change to: /guidelines

# Rename directory
mv app/code-of-contribution app/guidelines

# Now accessible at: /guidelines
```

### Updating Colors

Modify Tailwind classes throughout the file:

```typescript
// Example: Change primary blue to indigo
// Find and replace:
// blue-600 → indigo-600
// blue-50 → indigo-50
// blue-200 → indigo-200
// blue-700 → indigo-700
```

### Adding Your Logo

Update the documentation card:

```typescript
// In the header section, add your logo
<img 
  src="/logo.svg" 
  alt="Tauzand Intelligence"
  className="h-8 w-auto mb-4"
/>
```

### Changing Navbar/Footer

If your Navbar and Footer use different props:

```typescript
// Example: If Navbar needs props
<Navbar variant="dark" />
<Footer year={2026} />
```

---

## Troubleshooting

### Issue: Lucide Icons Not Displaying

**Solution**: Ensure lucide-react is installed
```bash
npm install lucide-react
npm run dev  # Restart dev server
```

### Issue: Styling Looks Wrong

**Solution**: Verify Tailwind CSS is properly configured
```bash
# Check if Tailwind is processing the file
npm run dev
# Visit page and inspect element - should have Tailwind classes
```

### Issue: Page Not Found (404)

**Solution**: Verify file path matches route
```bash
# If page.tsx is at: app/code-of-contribution/page.tsx
# Then route is: /code-of-contribution

# To verify:
ls app/code-of-contribution/page.tsx
```

### Issue: TypeScript Errors

**Solution**: Ensure TypeScript version is correct
```bash
npm list typescript
# Should be 5.0+

# Update if needed
npm install typescript@latest --save-dev
```

### Issue: Images From Unsplash Not Loading

**Solution**: Verify image URLs are correct
```typescript
// Should be: https://images.unsplash.com/...
// NOT: https://unsplash.com/...

// If blocked, add to next.config.js:
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}
```

---

## Performance Optimization

### Image Optimization

If using Next.js Image component:

```typescript
import Image from 'next/image'

// Instead of <img>
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  className="w-full h-auto"
/>
```

### Font Optimization

In `app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

---

## Deployment Checklist

Before deploying to production:

- [ ] TypeScript compiles without errors
- [ ] All imports resolve correctly
- [ ] Navbar and Footer components exist
- [ ] Lucide React is installed
- [ ] No API keys in code
- [ ] .env.local is in .gitignore
- [ ] Responsive design tested
- [ ] All links work
- [ ] Production build succeeds
- [ ] Page accessible at correct URL

---

## Deploying to Vercel

### Method 1: GitHub Integration

```bash
# Push to GitHub
git add .
git commit -m "Add Code of Contribution page"
git push origin main

# In Vercel dashboard:
# 1. Import GitHub repository
# 2. Select project
# 3. Deploy
```

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

### Method 3: Automatic Deployment

```bash
# vercel.json configuration
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "https://api.example.com"
  }
}
```

---

## Post-Deployment

After deploying, verify:

1. **Visit your URL**
   - https://team-six-rosy.vercel.app/code-of-contribution

2. **Test functionality**
   - Scroll through all sections
   - Click Google Drive documentation link
   - Test responsive design (mobile, tablet, desktop)

3. **Check Analytics**
   - Monitor page views
   - Track user engagement
   - Identify bounce points

4. **Monitor Errors**
   - Check Vercel logs for errors
   - Monitor console errors
   - Set up error tracking (Sentry, LogRocket, etc.)

---

## Maintenance & Updates

### Regular Updates

```bash
# Keep dependencies updated
npm update
npm outdated  # Check for new versions

# Update Lucide React
npm install lucide-react@latest
```

### Content Updates

To update page content:

1. Edit `app/code-of-contribution/page.tsx`
2. Update violation policies or guidelines
3. Rebuild and redeploy

```bash
npm run build
vercel --prod
```

### Version Control

```bash
# Create a release for major changes
git tag -a v1.0.0 -m "Initial Code of Contribution page"
git push origin v1.0.0
```

---

## Support Resources

📚 **Documentation**
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev/)

🐛 **Debugging**
- [Vercel Logs](https://vercel.com/docs/platform/logs)
- [Next.js Debugging](https://nextjs.org/docs/debugging)

🚀 **Deployment**
- [Vercel Deploy Guide](https://vercel.com/docs/deployments/overview)
- [GitHub Pages](https://pages.github.com/)

---

## Quick Command Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run type-check       # Check TypeScript errors

# Git
git add .
git commit -m "message"
git push origin main

# Deployment
vercel                   # Deploy to staging
vercel --prod           # Deploy to production

# Maintenance
npm update              # Update all packages
npm outdated            # Check outdated packages
npm audit              # Check security vulnerabilities
```

---

## Contact & Support

**Project Owner**: Aayush Kumar Gupta

**Repository**: https://github.com/AayushKGupta12/team

**Deployment**: https://team-six-rosy.vercel.app/

**Documentation**: https://drive.google.com/file/d/1r2ZqUKwjWEVir1dilernOPYjgsCMrEVu/view?usp=drive_link

---

**Integration Complete!** 🎉

Your Code of Contribution page is now ready for use. Remember to follow all guidelines and policies outlined in the page itself.
