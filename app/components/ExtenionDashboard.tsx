"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  Copy,
  RefreshCw,
  Check,
  Zap,
  Key,
  BarChart3,
  Wallet,
  X,
  Sparkles,
  AlertCircle,
  CreditCard,
  HelpCircle,
  LogOut,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

interface DashboardData {
  api_key: string;
  total_usage: number;
  credits_total: number;
  created_at: string;
}

interface Notification {
  type: "success" | "error" | "info";
  message: string;
}

interface MockUsageHistory {
  date: string;
  usage: number;
}

// ── Design tokens matching Vfound.in ──
const T = {
  bg: "#F3F4F6",           // cool blue-gray page bg (matches sidebar tone)
  surface: "#ffffff",       // card / panel white
  sidebar: "#e4e8f4",       // sidebar blue-gray
  border: "#dde2f0",        // border
  borderLight: "#eaecf5",   // lighter border
  navy: "#1a2540",          // primary text (dark navy)
  navyMid: "#3b4a6b",       // secondary text
  muted: "#7b8db0",         // muted / caption text
  teal: "#10b981",          // primary accent (teal / emerald)
  tealDark: "#059669",      // teal hover
  tealBg: "#ecfdf5",        // teal background tint
  tealBorder: "#a7f3d0",    // teal border
  yellow: "#fde68a",        // yellow highlight (hero text accent)
  yellowBg: "#fffbeb",      // yellow bg
  blue: "#4f6ef7",          // secondary accent blue (used sparingly)
  blueBg: "#eff2fe",        // blue bg tint
  blueBorder: "#c7d2fe",    // blue border
  danger: "#ef4444",        // error / danger
  dangerBg: "#fef2f2",      // danger bg
  dangerBorder: "#fecaca",  // danger border
  amber: "#f59e0b",         // warning amber
  amberBg: "#fffbeb",
};

export default function ExtensionDashboard() {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showRegenConfirm, setShowRegenConfirm] = useState<boolean>(false);
  const [usageHistory, setUsageHistory] = useState<MockUsageHistory[]>([]);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiWarning, setShowApiWarning] = useState(false);

  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (showApiKey) {
      const t = setTimeout(() => setShowApiKey(false), 10000);
      return () => clearTimeout(t);
    }
  }, [showApiKey]);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/extension-dashboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PIRACY-KEY": "120305Aayushgupta",
        },
        body: JSON.stringify({ clerk_user_id: user.id }),
      });
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      const resData: DashboardData = await res.json();
      setData(resData);
      setUsageHistory([
        { date: "Jan", usage: 120 },
        { date: "Feb", usage: 180 },
        { date: "Mar", usage: 150 },
        { date: "Apr", usage: 200 },
        { date: "May", usage: 220 },
        { date: "Jun", usage: resData.total_usage },
      ]);
      showNotification("success", "Dashboard refreshed!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) fetchData();
    else if (isLoaded && !user) setLoading(false);
  }, [user, isLoaded]);

  const regenerateApiKey = async () => {
    setShowRegenConfirm(false);
    if (!user) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/regenerate-api-key `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PIRACY-KEY": "120305Aayushgupta",
        },
        body: JSON.stringify({ clerk_user_id: user.id }),
      });
      const resData = await res.json();
      if (res.ok) {
        showNotification("success", "API key regenerated!");
        setData((prev) => (prev ? { ...prev, api_key: resData.api_key } : prev));
      } else {
        showNotification("error", resData.error || "Regeneration failed");
      }
    } catch {
      showNotification("error", "Failed to regenerate API key");
    }
  };

  const copyApiKey = () => {
    if (!data?.api_key) return;
    navigator.clipboard.writeText(data.api_key).then(() => {
      setCopied(true);
      showNotification("success", "API key copied!");
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4500);
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-[3px] rounded-full animate-spin" style={{ borderColor: T.tealBorder, borderTopColor: T.teal }} />
          <p className="text-sm font-medium tracking-widest uppercase" style={{ color: T.muted }}>Loading your workspace</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: T.bg }}>
        <div className="max-w-md w-full text-center space-y-8">
          <div className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: T.sidebar }}>
            <Key className="w-9 h-9" style={{ color: T.blue }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: T.navy }}>Sign in to continue</h2>
            <p style={{ color: T.muted }}>Access your API keys, usage stats, and more.</p>
          </div>
          <a href="/sign-in" className="inline-flex items-center px-10 py-3.5 font-semibold rounded-xl transition-all text-white" style={{ background: T.teal }}>
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
        <div className="text-center space-y-5">
          <div className="mx-auto w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: T.dangerBg }}>
            <X className="w-8 h-8" style={{ color: T.danger }} />
          </div>
          <p className="text-lg font-medium" style={{ color: T.navy }}>{error}</p>
          <button onClick={fetchData} className="font-medium underline underline-offset-4" style={{ color: T.teal }}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const remaining = data.credits_total - data.total_usage;
  const usagePercent = Math.min((data.total_usage / data.credits_total) * 100, 100);
  const isLow = remaining < 50;

  return (
    <div className="min-h-screen" style={{ background: T.bg }}>

      {/* Top teal accent bar — matches your CTA green */}
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${T.teal}, ${T.blue}, ${T.teal})` }} />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-16 space-y-14">

        {/* ── Header ── */}
        <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight" style={{ color: T.navy }}>
              Your Dashboard
            </h1>
            <p className="mt-2 text-xl" style={{ color: T.muted }}>
              Welcome back, {user?.firstName || "there"}  your account is active and ready ✦
            </p>
          </div>
          <div className="flex items-center gap-3 ">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border transition-all disabled:opacity-60 cursor-pointer"
              style={{ background: T.surface, borderColor: T.border, color: T.navyMid }}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              className="p-2.5 rounded-xl border transition-all  cursor-pointer"
              style={{ background: T.surface, borderColor: T.border, color: T.muted }}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ── Overview Stats ── */}
        <section className="space-y-5">
          <SectionLabel teal={T.teal} navy={T.navy} border={T.border}>Overview</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatCard
              icon={<BarChart3 className="w-5 h-5" />}
              label="Total Usage"
              value={data.total_usage.toLocaleString()}
              sub="Requests processed"
              accentColor={T.blue}
              accentBg={T.blueBg}
              borderColor={T.blueBorder}
              surface={T.surface}
              border={T.border}
              navy={T.navy}
              muted={T.muted}
            />
            <StatCard
              icon={<Wallet className="w-5 h-5" />}
              label="Total Credits"
              value={data.credits_total.toLocaleString()}
              sub="Credits allocated"
              accentColor={T.teal}
              accentBg={T.tealBg}
              borderColor={T.tealBorder}
              surface={T.surface}
              border={T.border}
              navy={T.navy}
              muted={T.muted}
            />
            <StatCard
              icon={<Zap className="w-5 h-5" />}
              label="Remaining"
              value={remaining.toLocaleString()}
              sub={isLow ? "Running low — top up soon" : "Credits available"}
              accentColor={isLow ? T.danger : T.teal}
              accentBg={isLow ? T.dangerBg : T.tealBg}
              borderColor={isLow ? T.dangerBorder : T.tealBorder}
              surface={T.surface}
              border={T.border}
              navy={T.navy}
              muted={T.muted}
              badge={isLow ? "Low" : undefined}
            />
          </div>
        </section>

        {/* ── API Management ── */}
        <section className="space-y-5">
          <SectionLabel teal={T.teal} navy={T.navy} border={T.border}>API Management</SectionLabel>
          <div
            className="rounded-2xl border p-8 lg:p-10"
            style={{ background: T.surface, borderColor: T.border }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: T.blueBg }}>
                  <Key className="w-5 h-5" style={{ color: T.blue }} />
                </div>
                <div>
                  <p className="font-semibold text-base" style={{ color: T.navy }}>Your API Key</p>
                  <p className="text-xs mt-0.5" style={{ color: T.muted }}>Keep this private and secure</p>
                </div>
              </div>
              <button
                onClick={() => setShowRegenConfirm(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border transition-all cursor-pointer"
                style={{ background: T.bg, borderColor: T.border, color: T.navyMid }}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate Key
              </button>
            </div>

            <div
              className="flex items-center gap-3 rounded-xl px-5 py-4 border"
              style={{ background: T.bg, borderColor: T.border }}
            >
              <code className="flex-1 font-mono text-sm break-all select-all" style={{ color: T.navy }}>
                {showApiKey ? data.api_key : "sk-••••••••••••••••••••••••••••••"}
              </code>
              <button
                onClick={() => {
                  if (!showApiKey) setShowApiWarning(true);
                  setShowApiKey(!showApiKey);
                }}
                className="shrink-0 p-2 rounded-lg transition-colors cursor-pointer"
                style={{ color: T.muted }}
                aria-label="Toggle API key"
              >
                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <button
                onClick={copyApiKey}
                className="shrink-0 p-2 rounded-lg transition-colors cursor-pointer"
                aria-label="Copy API key"
              >
                {copied
                  ? <Check className="w-5 h-5" style={{ color: T.teal }} />
                  : <Copy className="w-5 h-5" style={{ color: T.muted }} />}
              </button>
            </div>
          </div>

          {/* API Warning Modal */}
          <AnimatePresence>
            {showApiWarning && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[10000] flex items-center justify-center px-5"
                style={{ background: "rgba(26,37,64,0.25)", backdropFilter: "blur(4px)" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-md rounded-2xl border p-8 shadow-2xl"
                  style={{ background: T.surface, borderColor: T.border }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#fff7ed" }}>
                      <AlertTriangle className="w-5 h-5" style={{ color: T.amber }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: T.navy }}>API Key Visibility</h3>
                      <p className="text-sm mt-0.5" style={{ color: T.muted }}>Please review before revealing your key</p>
                    </div>
                  </div>
                  <div className="rounded-xl p-5 mb-6 space-y-3" style={{ background: T.amberBg, border: `1px solid #fde68a` }}>
                    {[
                      ["Full access:", "This key grants complete account control."],
                      ["Keep secure:", "Anyone with it can use your credits."],
                      ["Do not share:", "Never expose it publicly or in code."],
                      ["If exposed:", "Regenerate immediately to revoke access."],
                    ].map(([bold, text]) => (
                      <div key={bold as string} className="flex items-start gap-2.5 text-sm" style={{ color: "#92400e" }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: T.amber }} />
                        <p><span className="font-semibold">{bold}</span> {text}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowApiWarning(false)}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer"
                    style={{ background: T.navy }}
                  >
                    I Understand — Show Key
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── Usage Analytics ── */}
        <section className="space-y-5">
          <SectionLabel teal={T.teal} navy={T.navy} border={T.border}>Usage Analytics</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Credit usage */}
            <div className="rounded-2xl border p-8 lg:p-10 space-y-7" style={{ background: T.surface, borderColor: T.border }}>
              <div>
                <p className="text-base font-semibold" style={{ color: T.navy }}>Credit Usage</p>
                <p className="text-sm mt-1" style={{ color: T.muted }}>{usagePercent.toFixed(1)}% of your total credits used</p>
              </div>
              <div>
                <div className="h-20 rounded-md overflow-hidden" style={{ background: T.bg }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${usagePercent}%` }}
                    transition={{ duration: 2.4, ease: "easeOut" }}
                    className="h-20 rounded-md"
                    style={{
                      background: isLow
                        ? `linear-gradient(90deg, ${T.danger}, #f87171)`
                        : usagePercent > 75
                        ? `linear-gradient(90deg, ${T.amber}, #fbbf24)`
                        : `linear-gradient(90deg, ${T.teal}, #34d399)`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-3 text-sm" style={{ color: T.muted }}>
                  <span>{data.total_usage.toLocaleString()} used</span>
                  <span>{data.credits_total.toLocaleString()} total</span>
                </div>
              </div>
            </div>

            {/* Video guide */}
<div className="rounded-2xl border p-8 lg:p-10 space-y-5" style={{ background: T.surface, borderColor: T.border }}>
  <div className="flex items-center justify-between">
    <div>
      <p className="text-base font-semibold" style={{ color: T.navy }}>Quick Start Guide</p>
      <p className="text-sm mt-1" style={{ color: T.muted }}>New to the extension? Watch the 2-min walkthrough</p>
    </div>
    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: T.tealBg, color: T.teal, border: `1px solid ${T.tealBorder}` }}>
      2 min
    </span>
  </div>
  
  <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ border: `1px solid ${T.border}` }}>
    <div className="aspect-video relative">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/674Dj3HwsNM?autoplay=1&mute=${muted ? 1 : 0}&modestbranding=1&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />

      {/* Sound Button Overlay */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setMuted(!muted);
        }}
        className="absolute bottom-1 right-1 z-10 flex items-center gap-1 p-1 
                   bg-white/95 border border-neutral-200/80 rounded-full font-semibold text-neutral-700"
      >
        <span className="text-base">
          {muted ? "🔇" : "🔊"}
        </span>
      </button>

      {/* Click to open on YouTube overlay */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={() => window.open("https://youtu.be/674Dj3HwsNM?si=DNPM7CJ0UYBmrAMQ", "_blank")} 
      />
      </div>
  </div>
</div>
          </div>
        </section>

        {/* ── Billing & Upgrade ── */}
        {/* <section className="space-y-5">
          <SectionLabel teal={T.teal} navy={T.navy} border={T.border}>Billing & Upgrade</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="rounded-2xl border p-8 space-y-5" style={{ background: T.surface, borderColor: T.border }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: T.tealBg }}>
                  <CreditCard className="w-5 h-5" style={{ color: T.teal }} />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: T.navy }}>Billing Info</p>
                  <p className="text-xs mt-0.5" style={{ color: T.muted }}>Current plan: Free Beta</p>
                </div>
              </div>
              <button
                className="w-full py-3 rounded-xl text-sm font-medium border transition-all"
                style={{ background: T.bg, borderColor: T.border, color: T.navyMid }}
              >
                Manage Billing
              </button>
            </div>

            Upgrade card — uses teal CTA just like your  ----- remove this from code 
            <div
              className="rounded-2xl border p-8 space-y-5 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${T.tealBg} 0%, #f0fdf9 100%)`, borderColor: T.tealBorder }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-[0.07]" style={{ background: T.teal, transform: "translate(35%, -35%)" }} />
              <div className="flex items-center gap-3 relative">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "#d1fae5" }}>
                  <Sparkles className="w-5 h-5" style={{ color: T.teal }} />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: T.navy }}>Upgrade to Pro</p>
                  <p className="text-xs mt-0.5" style={{ color: T.teal }}>Unlimited credits & priority support</p>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all relative shadow-sm cursor-pointer"
                style={{ background: T.teal }}
                onMouseEnter={e => (e.currentTarget.style.background = T.tealDark)}
                onMouseLeave={e => (e.currentTarget.style.background = T.teal)}
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </section> */}

        {/* ── Support & Resources ── */}
        <section className="space-y-5">
          <SectionLabel teal={T.teal} navy={T.navy} border={T.border}>Support & Resources</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <a
              href="/extension/api-doc"
              className="flex items-center gap-5 rounded-2xl border p-6 transition-all"
              style={{ background: T.surface, borderColor: T.border }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.blueBg }}>
                <HelpCircle className="w-5 h-5" style={{ color: T.blue }} />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: T.navy }}>API Documentation</p>
                <p className="text-sm mt-0.5" style={{ color: T.muted }}>Get started with integration guides</p>
              </div>
            </a>
            <a
              href="/contact"
              className="flex items-center gap-5 rounded-2xl border p-6 transition-all"
              style={{ background: T.surface, borderColor: T.border }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: T.tealBg }}>
                <AlertCircle className="w-5 h-5" style={{ color: T.teal }} />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: T.navy }}>Contact Support</p>
                <p className="text-sm mt-0.5" style={{ color: T.muted }}>We're here to help you succeed</p>
              </div>
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t"
          style={{ borderColor: T.border }}
        >
          <p className="text-sm" style={{ color: T.muted }}>
            Member since{" "}
            <time className="font-medium" style={{ color: T.navyMid }}>
              {new Date(data.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
          <p className="text-md" style={{ color: T.muted }}>Vfound.in · All rights reserved</p>
        </footer>
      </div>

      {/* ── Premium Modal ── */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            style={{ background: "rgba(26,37,64,0.2)", backdropFilter: "blur(4px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl border p-10 shadow-2xl"
              style={{ background: T.surface, borderColor: T.border }}
            >
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-5 right-5 p-2 rounded-lg transition-colors" style={{ color: T.muted }}>
                <X className="w-6 h-6 cursor-pointer" />
              </button>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-7" style={{ background: T.tealBg, border: `1px solid ${T.tealBorder}`, color: T.teal }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.teal }} />
                Beta Program Active
              </div>

              <h2 className="text-2xl font-bold mb-3" style={{ color: T.navy }}>
                You're an Early Member 🎉
              </h2>
              <p className="mb-8 leading-relaxed" style={{ color: T.navyMid }}>
                Payments aren't live yet. As a thank you for joining early, you get full Pro features completely free during beta, no strings attached.
              </p>

              <div className="rounded-xl p-6 mb-8 space-y-3.5" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
                <p className="text-[11px] font-semibold tracking-widest uppercase mb-4" style={{ color: T.muted }}>What's included</p>
                {[
                  "700 credits free during beta",
                  "Unlimited API access, no rate limits",
                  "Priority support, talk directly to us",
                  "Lock in lowest pricing when we launch",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm" style={{ color: T.navyMid }}>
                    <Check className="w-4 h-4 shrink-0" style={{ color: T.teal }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full py-3.5 rounded-xl font-semibold text-white text-sm cursor-pointer"
                style={{ background: T.teal }}
              >
                Got it, Let's Continue
              </button>
              {/* <p className="mt-4 text-center text-sm" style={{ color: T.muted }}>
                We'll notify you when paid plans launch.
              </p> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Regen Confirm Modal ── */}
      <AnimatePresence>
        {showRegenConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            style={{ background: "rgba(26,37,64,0.2)", backdropFilter: "blur(4px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-2xl border p-8 shadow-2xl"
              style={{ background: T.surface, borderColor: T.border }}
            >
              <button onClick={() => setShowRegenConfirm(false)} className="absolute top-5 right-5 p-2 rounded-lg" style={{ color: T.muted }}>
                <X className="w-5 h-5 cursor-pointer" />
              </button>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: T.dangerBg }}>
                  <AlertCircle className="w-5 h-5" style={{ color: T.danger }} />
                </div>
                <div>
                  <h2 className="font-bold text-lg" style={{ color: T.navy }}>Confirm Regeneration</h2>
                  <p className="text-xs mt-0.5" style={{ color: T.muted }}>This action cannot be undone</p>
                </div>
              </div>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: T.navyMid }}>
                Your current API key will stop working immediately. All integrations using the old key will need to be updated.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRegenConfirm(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium border cursor-pointer"
                  style={{ background: T.bg, borderColor: T.border, color: T.navyMid }}
                >
                  Cancel
                </button>
                <button
                  onClick={regenerateApiKey}
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-white cursor-pointer"
                  style={{ background: T.danger }}
                >
                  Yes, Regenerate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toast ── */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[99] bottom-6 right-6 max-w-xs w-full rounded-xl overflow-hidden shadow-xl border"
            style={{
              background: T.surface,
              borderColor:
                notification.type === "success" ? T.tealBorder :
                notification.type === "error" ? T.dangerBorder : T.blueBorder,
            }}
          >
            <div className="flex items-center gap-3 px-5 py-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background:
                    notification.type === "success" ? T.tealBg :
                    notification.type === "error" ? T.dangerBg : T.blueBg,
                }}
              >
                {notification.type === "success"
                  ? <Check className="w-4 h-4" style={{ color: T.teal }} />
                  : notification.type === "error"
                  ? <X className="w-4 h-4" style={{ color: T.danger }} />
                  : <AlertCircle className="w-4 h-4" style={{ color: T.blue }} />}
              </div>
              <p className="text-sm font-medium flex-1" style={{ color: T.navy }}>{notification.message}</p>
            </div>
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4.5, ease: "linear" }}
              className="h-[2px]"
              style={{
                background:
                  notification.type === "success" ? T.teal :
                  notification.type === "error" ? T.danger : T.blue,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Helpers ── */

function SectionLabel({ children, teal, navy, border }: { children: React.ReactNode; teal: string; navy: string; border: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-lg font-bold whitespace-nowrap" style={{ color: navy }}>{children}</h2>
      <div className="flex-1 h-px" style={{ background: border }} />
    </div>
  );
}

function Divider({ border }: { border: string }) {
  return <div className="h-px w-full" style={{ background: border }} />;
}

/* ── Stat Card ── */
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accentColor: string;
  accentBg: string;
  borderColor: string;
  surface: string;
  border: string;
  navy: string;
  muted: string;
  badge?: string;
}

function StatCard({ icon, label, value, sub, accentColor, accentBg, borderColor, surface, border, navy, muted, badge }: StatCardProps) {
  return (
    <div
      className="rounded-2xl border p-7 space-y-5 transition-shadow hover:shadow-md"
      style={{ background: surface, borderColor: border }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: accentBg, border: `1px solid ${borderColor}` }}
        >
          <div style={{ color: accentColor }}>{icon}</div>
        </div>
        {badge && (
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: accentBg, color: accentColor, border: `1px solid ${borderColor}` }}
          >
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-[11px] font-semibold tracking-widest uppercase mb-1.5" style={{ color: muted }}>{label}</p>
        <p className="text-3xl font-bold" style={{ color: accentColor }}>{value}</p>
        <p className="text-xs mt-1.5" style={{ color: muted }}>{sub}</p>
      </div>
    </div>
  );
}