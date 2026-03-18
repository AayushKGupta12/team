"use client";
import { useState } from "react";
import { Check, Zap, Globe, GraduationCap, ArrowRight } from "lucide-react";

export default function PricingSection() {
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [extensionAdded, setExtensionAdded] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const creditPacks = [
    { qty: "75 Credits", price: "₹60", id: "75" },
    { qty: "125 Credits", price: "₹90", id: "125", popular: true },
    { qty: "250 Credits", price: "₹120", id: "250" },
  ];

  const internshipPlans = [
    { label: "30 Days", price: "₹249", sub: "Fast Track", id: "30" },
    { label: "45 Days", price: "₹299", sub: "Most Popular", id: "45" },
    { label: "60 Days", price: "₹349", sub: "Comprehensive", id: "60" },
  ];

  const handleCreditSelect = (id) => {
    setSelectedCredit(id);
  };

  const handleCreditRecharge = () => {
    if (!selectedCredit) {
      showToast("⚠️ Please select a credit pack first");
      return;
    }
    const pack = creditPacks.find((p) => p.id === selectedCredit);
    showToast(`✅ ${pack.qty} added to cart — ${pack.price}`);
  };

  const handleExtension = () => {
    setExtensionAdded((prev) => !prev);
    showToast(extensionAdded ? "❌ Extension pack removed" : "✅ Chrome Extension pack added ₹160");
  };

  const handleInternshipSelect = (id) => {
    setSelectedInternship(id);
  };

  const handleInternshipJoin = () => {
    if (!selectedInternship) {
      showToast("⚠️ Please select an internship plan first");
      return;
    }
    const plan = internshipPlans.find((p) => p.id === selectedInternship);
    showToast(`🎓 Enrolling in ${plan.label} internship — ${plan.price}`);
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#0d2440",
            color: "white",
            padding: "14px 24px",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "14px",
            zIndex: 9999,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            whiteSpace: "nowrap",
          }}
        >
          {toast}
        </div>
      )}

      <section className="py-20 bg-[#0d2440] text-white rounded-4xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Flexible <span className="text-amber-400">Pay-As-You-Go</span> Plans
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              No recurring subscriptions. Purchase what you need, when you need it. All plans include lifetime validity on credits.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">

            {/* AI Credits */}
            <div className="bg-white rounded-3xl p-1 shadow-xl transform transition hover:scale-[1.02]">
              <div className="bg-amber-50/50 rounded-[calc(1.5rem-1px)] p-8 h-full flex flex-col border border-amber-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Zap className="text-[#0d2440] w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0d2440]">AI Credits</h3>
                </div>

                <div className="mb-8 p-4 bg-white rounded-2xl border border-amber-200 shadow-sm">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Starter Pack</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#0d2440]">
                      75 <span className="text-green-600">FREE</span>
                    </span>
                    <span className="text-sm text-gray-500 font-medium">Credits</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {creditPacks.map((pack) => {
                    const isSelected = selectedCredit === pack.id;
                    return (
                      <button
                        key={pack.id}
                        onClick={() => handleCreditSelect(pack.id)}
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          outline: "none",
                          transition: "all 0.2s ease",
                          transform: isSelected ? "scale(1.02)" : "scale(1)",
                        }}
                        className={`flex justify-between items-center p-4 rounded-xl border text-left ${
                          isSelected
                            ? "border-amber-500 bg-amber-50 shadow-lg ring-2 ring-amber-400"
                            : pack.popular
                            ? "border-amber-300 bg-white shadow-md hover:border-amber-400"
                            : "border-gray-200 bg-gray-50/50 hover:border-amber-300 hover:bg-amber-50/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              border: isSelected ? "none" : "2px solid #d1d5db",
                              background: isSelected ? "#f59e0b" : "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {isSelected && (
                              <svg width="10" height="10" viewBox="0 0 10 10">
                                <polyline points="2,5 4,7 8,3" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            )}
                          </div>
                          <span className="font-bold text-gray-800">{pack.qty}</span>
                          {pack.popular && (
                            <span style={{ fontSize: "10px", background: "#fef3c7", color: "#92400e", padding: "1px 6px", borderRadius: "999px", fontWeight: "700" }}>
                              POPULAR
                            </span>
                          )}
                        </div>
                        <span className="text-lg font-black text-[#0d2440]">{pack.price}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleCreditRecharge}
                  style={{ cursor: "pointer", transition: "all 0.2s" }}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 ${
                    selectedCredit
                      ? "bg-[#0d2440] text-white hover:bg-opacity-80"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {selectedCredit ? "Buy Now" : "Select a Pack"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chrome Tool */}
            <div className="bg-white rounded-3xl p-1 shadow-xl transform transition hover:scale-[1.02]">
              <div className="bg-blue-50/30 rounded-[calc(1.5rem-1px)] p-8 h-full flex flex-col border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Globe className="text-[#0d2440] w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0d2440]">Chrome Tool</h3>
                </div>

                <div className="mb-8 p-4 bg-[#0d2440] rounded-2xl text-white">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Welcome Gift</p>
                  <p className="text-2xl font-black">300,000 Tokens</p>
                  <p className="text-[10px] text-gray-300">Lifetime generation free</p>
                </div>

                <div
                  style={{
                    transition: "all 0.3s ease",
                    border: extensionAdded ? "2px solid #3b82f6" : "2px dashed #bfdbfe",
                    background: extensionAdded ? "#eff6ff" : "white",
                  }}
                  className="text-center p-6 rounded-2xl mb-8"
                >
                  <p className="text-sm text-gray-500 font-medium mb-1">Standard Top-up</p>
                  <p className="text-4xl font-black text-[#0d2440]">₹160</p>
                  <p className="text-xs text-blue-600 font-bold mt-2">Get 300,000 more Tokens</p>
                  {extensionAdded && (
                    <p style={{ color: "#16a34a", fontWeight: "700", fontSize: "12px", marginTop: "8px" }}>
                      ✅ Added to cart
                    </p>
                  )}
                </div>

                <button
                  onClick={handleExtension}
                  style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                  className={`w-full py-4 rounded-xl font-bold transition ${
                    extensionAdded
                      ? "bg-blue-600 text-white border-2 border-blue-600"
                      : "border-2 border-[#0d2440] text-[#0d2440] hover:bg-[#0d2440] hover:text-white"
                  }`}
                >
                  {extensionAdded ? "✓ Pack Added — Remove" : "Buy Extension Pack"}
                </button>
              </div>
            </div>

            {/* Internships */}
            <div className="bg-white rounded-3xl p-1 shadow-xl transform transition hover:scale-[1.02]">
              <div className="bg-amber-50/50 rounded-[calc(1.5rem-1px)] p-8 h-full flex flex-col border border-amber-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-200 rounded-lg">
                    <GraduationCap className="text-[#0d2440] w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0d2440]">Internships</h3>
                </div>

                <div className="space-y-3 mb-8">
                  {internshipPlans.map((plan) => {
                    const isSelected = selectedInternship === plan.id;
                    return (
                      <button
                        key={plan.id}
                        onClick={() => handleInternshipSelect(plan.id)}
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          outline: "none",
                          textAlign: "left",
                          transition: "all 0.2s ease",
                          transform: isSelected ? "scale(1.02)" : "scale(1)",
                        }}
                        className={`flex justify-between items-center p-4 rounded-xl border ${
                          isSelected
                            ? "border-amber-500 bg-amber-50 shadow-lg ring-2 ring-amber-400"
                            : "border-gray-100 bg-white hover:border-amber-300 hover:bg-amber-50/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              border: isSelected ? "none" : "2px solid #d1d5db",
                              background: isSelected ? "#f59e0b" : "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {isSelected && (
                              <svg width="10" height="10" viewBox="0 0 10 10">
                                <polyline points="2,5 4,7 8,3" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-[#0d2440]">{plan.label}</p>
                            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter">{plan.sub}</p>
                          </div>
                        </div>
                        <span className="text-xl font-black text-gray-900">{plan.price}</span>
                      </button>
                    );
                  })}
                </div>

                <ul className="space-y-3 mb-8 px-2 flex-grow">
                  {["Live Project Access", "Mentor Support", "Verified Certificate"].map((item) => (
                    <li key={item} className="flex items-center text-sm text-gray-700 font-medium">
                      <Check className="h-4 w-4 text-amber-500 mr-3 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleInternshipJoin}
                  style={{ cursor: "pointer", transition: "all 0.2s ease" }}
                  className={`w-full py-4 rounded-xl font-black shadow-lg transition ${
                    selectedInternship
                      ? "bg-amber-500 text-[#0d2440] hover:bg-amber-400 shadow-amber-200/50"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {selectedInternship ? "Enroll Now →" : "Select a Plan"}
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-5 text-sm font-bold text-amber-400">Services Included</th>
                    <th className="p-5 text-sm font-bold text-center">Credits</th>
                    <th className="p-5 text-sm font-bold text-center">Extension</th>
                    <th className="p-5 text-sm font-bold text-center">Internship</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 divide-y divide-white/5">
                  {["AI Resume Analysis", "Cover Letter Engine", "Auto-fill Applications", "Job Strategy Mentoring"].map(
                    (feature, idx) => (
                      <tr key={feature}>
                        <td className="p-4 text-sm font-medium">{feature}</td>
                        <td className="p-4 text-center">
                          {idx < 2 ? <Check className="inline w-4 h-4 text-amber-400" /> : "—"}
                        </td>
                        <td className="p-4 text-center">
                          {idx === 2 ? <Check className="inline w-4 h-4 text-amber-400" /> : "—"}
                        </td>
                        <td className="p-4 text-center">
                          {idx !== 2 ? <Check className="inline w-4 h-4 text-amber-400" /> : "—"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#e7f0fa] -z-20" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto">
          <div className="bg-amber-400 rounded-[3rem] p-1 shadow-[0_20px_50px_rgba(251,191,36,0.3)]">
            <div
              className="bg-amber-400 border-4 border-[#0d2440] rounded-[2.7rem] px-8 py-16 md:px-16 text-center relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d2440' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-[#0d2440] mb-6 leading-tight">
                  Ready to{" "}
                  <span className="underline decoration-8 decoration-[#0d2440]/90 underline-offset-4">Accelerate</span>{" "}
                  Your Career?
                </h2>
                <p className="text-[#0d2440]/80 text-lg md:text-xl font-bold max-w-2xl mx-auto mb-12">
                  Whether it's custom credits, internship queries, or technical support our team is standing by to help you win.
                </p>
                <a href="/contact" className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button
                    style={{ cursor: "pointer" }}
                    className="group w-full sm:w-auto px-10 py-5 bg-[#0d2440] text-amber-400 rounded-2xl font-black text-xl shadow-[0_8px_0_0_#2e5e99] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-3"
                  >
                    TALK TO US
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}