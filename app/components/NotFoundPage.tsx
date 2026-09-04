import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="w-full">
      <div className="relative w-full bg-[#e7f0fa] overflow-hidden px-6 py-16 sm:py-20 lg:py-24 min-h-[520px] flex flex-col items-center justify-center text-center">
        {/* Robot illustration */}
        <Image
          src="/404-robot.png"
          alt="Robot at a laptop"
          width={200}
          height={200}
          className="mt-6 mb-4 [image-rendering:pixelated]"
          priority
        />

        <h1 className="text-7xl sm:text-8xl lg:text-8xl font-semibold text-[#0d2440] tracking-tight">
          404
        </h1>

        <p className="mt-3 max-w-xs sm:max-w-2xl text-base sm:text-lg text-slate-600 px-2">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable. Head back to the Tauzand homepage
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#0074D9] text-white font-semibold text-base px-20 py-3 hover:bg-[#0063b8] transition-colors"
        >
          Back to Home
        </Link>

        <Link
          href="/contact"
          className="mt-8 text-base font-medium text-[#0074D9] underline underline-offset-2 hover:text-[#0063b8] transition-colors"
        >
          Report Broken Link
        </Link>
      </div>
    </div>
  );
}