# Code of Contribution - Quick Reference & Code Snippets

## Document Link
Official documentation is embedded at:
```
https://drive.google.com/file/d/1r2ZqUKwjWEVir1dilernOPYjgsCMrEVu/view?usp=drive_link
```

---

## Component Import Pattern

```typescript
'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AlertCircle, FileText, ExternalLink, CheckCircle2, AlertTriangle } from 'lucide-react'

interface ComponentProps {}

const YourComponent: React.FC<ComponentProps> = () => {
  return (
    <div>
      {/* Your JSX here */}
    </div>
  )
}

export default YourComponent
```

---

## Correct Code Examples

### ✅ GOOD: Proper TypeScript Component

```typescript
interface UserCardProps {
  name: string
  role: string
  image: string
  isActive: boolean
}

const UserCard: React.FC<UserCardProps> = ({ 
  name, 
  role, 
  image, 
  isActive 
}) => {
  return (
    <div className="bg-white p-4 border border-slate-300 rounded-lg">
      <img 
        src={image} 
        alt={name}
        className="w-16 h-16 rounded-full"
      />
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      <p className="text-sm text-slate-600">{role}</p>
      {isActive && (
        <span className="inline-block mt-2 px-2 py-1 bg-green-100 
                       text-green-800 rounded text-xs">
          Active
        </span>
      )}
    </div>
  )
}
```

### ✅ GOOD: Proper Environment Variable Usage

```typescript
// .env.local (LOCAL ONLY - NEVER COMMIT)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_UNSPLASH_KEY=your_key_here
NEXT_PUBLIC_FIGMA_TOKEN=your_token_here

// Usage in component
const ImageGallery: React.FC = () => {
  const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_KEY

  return (
    <div>
      <img 
        src={`https://api.unsplash.com/search/photos?query=nature&client_id=${unsplashKey}`}
        alt="Gallery"
      />
    </div>
  )
}
```

### ✅ GOOD: Proper Image Usage

```typescript
// From /public folder
<img 
  src="/images/hero.jpg" 
  alt="Hero section"
  className="w-full h-auto"
/>

// From Unsplash (free tier, attribution not required but appreciated)
<img 
  src="https://images.unsplash.com/photo-XXXXX"
  alt="Background"
  className="w-full h-auto"
/>
```

### ✅ GOOD: Formal, Minimal Styling

```typescript
const FormSection: React.FC = () => {
  return (
    <div className="bg-slate-50 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Submit Your Work
      </h2>
      <p className="text-slate-700 leading-relaxed mb-6">
        Please review all guidelines before submission.
      </p>
      <button className="px-6 py-2 bg-blue-600 text-white 
                        font-semibold rounded hover:bg-blue-700">
        Submit
      </button>
    </div>
  )
}
```

---

## Incorrect Code Examples

### ❌ BAD: Hardcoded API Keys

```typescript
// ABSOLUTELY FORBIDDEN
const API_KEY = "sk_live_51Hb4j2iBV**********"
const DATABASE_URL = "mongodb://user:password@cluster.mongodb.net"
const SECRET = "my_secret_password_123"

// This will result in IMMEDIATE TERMINATION
```

### ❌ BAD: Committing .env File

```bash
# NEVER DO THIS
git add .env
git commit -m "Added env variables"
git push

# .env MUST be in .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

### ❌ BAD: Using Copyrighted Images

```typescript
// FORBIDDEN - Licensed image
<img 
  src="https://istockphoto.com/photos/business" 
  alt="Business"
/>

// FORBIDDEN - Proprietary graphic
<img 
  src="https://company-proprietary-images.com/logo" 
  alt="Logo"
/>

// These result in PERMANENT RESTRICTION and TERMINATION
```

### ❌ BAD: Excessive Animations

```typescript
// ABSOLUTELY PROHIBITED
<div className="animate-bounce animate-spin animate-pulse 
              bg-gradient-to-r from-red-400 via-pink-500 to-red-600
              shadow-2xl drop-shadow-lg">
  <h1 className="text-4xl font-black italic animate-bounce">
    LOOK AT ME
  </h1>
</div>

// Result: First warning, then DISMISSAL
```

### ❌ BAD: Personal Information Not Commented

```typescript
// FORBIDDEN - Personal info visible in production
const InternComponent: React.FC = () => {
  const internID = "INT_2024_001"
  const internEmail = "john@email.com"
  const internPhone = "+91-9876543210"

  return <div>{internEmail}</div>
}

// MUST be commented out
/*
  Intern ID: INT_2024_001
  Intern Email: john@email.com
  Intern Phone: +91-9876543210
*/
```

### ❌ BAD: Icon Sources Other Than Lucide React

```typescript
// FORBIDDEN
import { FaUser } from 'react-icons/fa' // ❌ NO
import { MdCheckCircle } from 'react-icons/md' // ❌ NO
import CustomIcon from './custom-icons' // ❌ NO

// CORRECT
import { CheckCircle2, User } from 'lucide-react' // ✅ YES
```

### ❌ BAD: Complex, Unexplained Logic

```typescript
// FORBIDDEN - Too complex without explanation
const processData = (d: any[]): any => {
  return d.reduce((acc, item, idx) => {
    const v = Math.sqrt(item.x ** 2 + item.y ** 2)
    const f = v > 100 ? item.val * 1.5 : item.val / 0.8
    return [...acc, { ...item, processed: f, idx: idx }]
  }, [])
}

// CORRECT - Clear, simple, documented
interface DataItem {
  x: number
  y: number
  val: number
}

interface ProcessedItem extends DataItem {
  distance: number
  adjustedValue: number
}

// Calculate Euclidean distance and adjust value based on threshold
const processData = (items: DataItem[]): ProcessedItem[] => {
  return items.map((item) => {
    const distance = Math.sqrt(item.x ** 2 + item.y ** 2)
    const adjustedValue = distance > 100 
      ? item.val * 1.5 
      : item.val / 0.8
    
    return {
      ...item,
      distance,
      adjustedValue,
    }
  })
}
```

---

## Naming Convention Examples

### ✅ Good Names

```typescript
// Components
const UserProfileCard: React.FC = () => {}
const ProductListItem: React.FC = () => {}
const NavigationBar: React.FC = () => {}

// Functions
const calculateTotalPrice = (): number => {}
const formatDateString = (date: Date): string => {}
const handleFormSubmit = (): void => {}

// Variables
const isUserAuthenticated: boolean = true
const MAX_RETRY_ATTEMPTS: number = 3
const users_testimonial_data: string[] = []

// CSS Classes
className="users_profile_card"
className="product_details_section"
className="navbar_header"
```

### ❌ Bad Names

```typescript
// Unclear
const uc = () => {}
const x = 100
const data = []

// Inconsistent
const getUserData = () => {} // camelCase
const get_user_info = () => {} // snake_case (mixed)

// Not descriptive
const func1 = () => {}
const handleClick = () => {} // Which click? Which component?
const process = () => {}
```

---

## Pre-Submission Checklist

### TypeScript & Code Quality
- [ ] `npm run type-check` passes without errors
- [ ] No `any` types used (be specific with types)
- [ ] All interfaces properly defined
- [ ] Functions have return type annotations

### Security
- [ ] No hardcoded API keys, passwords, or tokens
- [ ] No personal information visible (if present, commented out)
- [ ] No .env file in git commits
- [ ] All external resources documented

### Design & Styling
- [ ] Only Tailwind CSS utility classes used
- [ ] No custom CSS files added
- [ ] Color palette matches (slate + blue)
- [ ] No animations unless explicitly required
- [ ] Responsive design verified (mobile, tablet, desktop)

### Assets & Resources
- [ ] All images from /public or Unsplash (free tier)
- [ ] All icons from Lucide React only
- [ ] No copyrighted material
- [ ] Image alt text present and descriptive

### Testing
- [ ] `npm run build` succeeds
- [ ] `npm run dev` runs without console errors
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Mobile responsiveness verified
- [ ] All links work correctly

### Documentation
- [ ] Component has proper JSDoc comments
- [ ] Complex logic is explained
- [ ] Figma design link included (in comments)
- [ ] Mentor name included (in comments)

---

## File Structure Template

```
your_name_intern/
├── page.tsx                    # Main page component
├── components/
│   ├── Component_1.tsx        # First component
│   ├── Component_2.tsx        # Second component
│   └── Component_3.tsx        # Third component
├── styles/
│   └── globals.css            # Tailwind imports (if needed)
└── README.md                  # Optional: Component documentation
```

---

## Environment Variables Template

```typescript
// .env.local (EXAMPLE - Never commit actual values)
// Copy to your local system and fill in YOUR values

NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_UNSPLASH_KEY=
NEXT_PUBLIC_FIGMA_TOKEN=
NEXT_PUBLIC_GITHUB_TOKEN=

// Private variables (backend only)
DATABASE_URL=
DATABASE_PASSWORD=
JWT_SECRET=
API_SECRET_KEY=
```

---

## Code of Conduct Violations Summary

### 🔴 IMMEDIATE TERMINATION (Zero Tolerance)

1. **Hardcoded Secrets**
   - API keys, passwords, tokens in code
   - .env files committed to git
   - Credentials in comments or strings

2. **Copyrighted Content**
   - Licensed images or graphics
   - Proprietary company materials
   - Protected intellectual property

3. **Unauthorized Backend Access**
   - Database connections without approval
   - Third-party API integration without approval
   - Security vulnerability exploitation

4. **Personal Information Exposure**
   - Uncommitted personal details in code
   - Phone numbers, emails, addresses visible
   - Intern ID/names in production code

### ⚠️ WARNINGS + POSSIBLE DISMISSAL

1. **Animation Violations**
   - First violation: Warning
   - Repeated violations: Dismissal

2. **Design Non-Compliance**
   - Excessive styling
   - Unapproved color schemes
   - Non-formal design approach

3. **Code Quality Issues**
   - Complex logic without documentation
   - Poor naming conventions
   - Inadequate testing

---

## Support & Resources

📚 **Official Documentation**
https://drive.google.com/file/d/1r2ZqUKwjWEVir1dilernOPYjgsCMrEVu/view?usp=drive_link

🔗 **Repository**
https://github.com/AayushKGupta12/team

🚀 **Deployment**
https://team-six-rosy.vercel.app/

👤 **Project Owner**
Aayush Kumar Gupta

---

**Last Updated**: July 2026
**Status**: ACTIVE & ENFORCED
**Violations Policy**: PERMANENT RESTRICTION & TERMINATION
