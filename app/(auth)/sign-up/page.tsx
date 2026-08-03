"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

/*
  Sign Up — Create account page
  Design ref: Amna Malik Figma v2 (Desktop-5 / iPhone 13&14-5 / iPad mini 8.3-5)
  Note: the <SignUp/> widget below is rendered with NO appearance overrides —
  it keeps Clerk's own default look and behaviour untouched. Only the page
  layout around it (image, heading, logo, footer) is built to match Figma.
  Footer sits only under the right (form) column on desktop — the image
  column runs the full page height alongside it.
*/

const HERO_IMAGE = "/jonathan-borba-BjNXpLGnJI0-unsplash.jpg";

export default function SignUpPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#e7f0fa] lg:grid-cols-2">
      {/* LEFT — image, desktop only, full page height, full-bleed cover */}
      <div className="relative hidden lg:block">
        <Image
          src={HERO_IMAGE}
          alt="Abstract image"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-28 left-8 right-8 text-white">
          <p className="text-3xl font-bold leading-snug">
            One step closer to your dream job.
          </p>
          <p className="mt-3 text-lg font-light text-white/80">
            Build resumes, track applications, and get real insights - all in
            one place.
          </p>
        </div>
      </div>

      {/* RIGHT — heading + Clerk widget on top, footer pinned at bottom of this column only */}
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          {/* Logo — mobile & tablet only */}
          <img
            src="/tauzand.png"
            alt="Tauzand"
            className="mb-4 h-24 w-24 rounded-full object-contain lg:hidden"
          />

          <h1 className="text-center text-3xl font-extrabold text-[#0d2440] sm:text-4xl">
            Create your account
          </h1>
          <p className="mt-2 text-center text-base text-slate-500 sm:text-lg">
            Continue building your career, step by step
          </p>

          {/* Clerk's default SignUp — untouched, no appearance prop */}
          <div className="mt-8 flex w-full justify-center">
            <SignUp routing="hash" signInUrl="/sign-in" />
          </div>
        </div>

        {/* FOOTER — only under this column, not under the image */}
        <footer className="border-t border-white/10 bg-[#050505] py-3 text-center text-sm text-white">
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-15">
            <span>© {new Date().getFullYear()} Tauzand.in</span>
            <Link href="/term-of-use" className="hover:text-white/70">
              Terms of Use
            </Link>
            <Link href="/term-of-use#disclaimer" className="hover:text-white/70">
              Disclaimer
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}