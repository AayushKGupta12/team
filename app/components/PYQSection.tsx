"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { consumeCredit } from "../../lib/consumeCredit";
import { motion } from "framer-motion";


import CreditUsedToast from "./CreditUsedToast";

type SemesterType = "4th" | "6th";

const PYQ_MAP: Record<SemesterType, Record<string, Record<string, string>>> = {
  "4th": {
  PS: {
  "2024": "https://drive.google.com/file/d/1lrbRawuiEu3om4buNmPp45Iy9Qv5eq_a/preview",
  "2023": "https://drive.google.com/file/d/1i9Rnu6MhkKVAnVpe5E0js0hRy4jjK3xz/preview",
  "2022": "https://drive.google.com/file/d/1zOyBmdLGhrUMLkWHsWfdOgiC5F3Ya8__/preview",
},


  Database_Management_System: {
    "2025": "https://drive.google.com/file/d/11b1-RgvTgHqXGbySlncvWaTZ1DsNjIfA/preview",
    "2024": "https://drive.google.com/file/d/193MDOPP2YpvapBMOLy5NXy-KFJnbDfzj/preview",
    "2020": "https://drive.google.com/file/d/1KnGbUcH5rAlFx0IMdnAZer6Ol4wCXU2e/preview",
    "2023": "https://drive.google.com/file/d/1UNPGoxfS6iN8aHItFPrzxaI12u_EimQd/preview",
  },

  Operating_System: {
    "2024": "https://drive.google.com/file/d/1K3S-TlGvdLwsrGp03C2vX3nLNw7B-DsE/preview",
    "2020": "https://drive.google.com/file/d/10NWOVV40KR6NwY6OiT2U-sKaXKed12lh/preview",
    "2023": "https://drive.google.com/file/d/10YdcyGp0LCr42QzipLcKRYpT525z1_V5/preview",
  },

  Information_Theory_Coding: {
    "2025": "https://drive.google.com/file/d/10KT32zcnoTSH0UX--4MHgODO6fOteGiM/preview",
    "2024": "https://drive.google.com/file/d/1HUGbEKPCAVppej-QoXvQMq0C2kYb5JqL/preview",
    "2023": "https://drive.google.com/file/d/1x-JfsR1pQu5B_jOgN7RQQ92wZ-Z5Srs5/preview",
  },

  Computer_Organization_Architecture: {
    "2024": "https://drive.google.com/file/d/15sAFe-xNRWHK2bqAXiboANhTb3PnA3l9/preview",
    "2020": "https://drive.google.com/file/d/1yhY4gI9SBxu93lTMCwdxRhC4zduEe89d/preview",
    "2023": "https://drive.google.com/file/d/1_nMz2Rn7aCUl5yHP24JIWfIj0D9ITAxm/preview",
  },

  // AFL: {
  //   "2024": "",
  //   "2020": "",
  //   "2023": "",
  // },

  // CE: {
  //   "2024": "",
  //   "2020": "",
  //   "2023": "",
  // },

  // STW: {
  //   "2024": "",
  //   "2020": "",
  //   "2023": "",
  // },

  Descrete_Mathematics: {
    "2024": "https://drive.google.com/file/d/12hbGwFjCWtmAmb_zqkPeZD4ISDwuT-Ce/preview",
    "2020": "https://drive.google.com/file/d/1idtMqZbT0z8SrRvT_QbvGrEYwt1iPQA-/preview",
    "2023": "https://drive.google.com/file/d/1E4WOM7U6wbzvaz5gljena2ihVoDSHHTG/preview",
  },

  Organizational_Behaviour: {
    // "2024": "",
    // "2020": "",
    "2023": "https://drive.google.com/file/d/1433LzKga7FKn8BNlzj2z4E2IJ4X2NKfU/preview",
  },

  Economics_of_Development: {
    "2024": "https://drive.google.com/file/d/1UGUUBMeqP7WRhbHj4VeqdJt9I9XOPEbn/preview",
    // "2020": "",
    "2023": "https://drive.google.com/file/d/1YEg2frwIhEmo5-Lyz55Hf35DsOCqtdvf/preview",
  },

  Engineering_Economics:{
    "2024A" :"https://drive.google.com/file/d/1gYt8XNGcv3mhnBL8_iLbfG7bdu6i1jfu/preview",
    "2024B" : "https://drive.google.com/file/d/1mEuAeD8TQbFrpAq7iADnN0zxLqrwHcEt/preview",
    "2025A": "https://drive.google.com/file/d/1FkkcQaJwpay1871qYQkT4_xQ8vfPpZkk/preview",
    "2025B" : "https://drive.google.com/file/d/1eFMjBTXcTMV3Jk05gLpcfGZx14BNvLKg/preview",
  },

  Object_Oriented_Programming_Java: {
  "2024": "https://drive.google.com/file/d/190Ul0ha0j-iy0_p6CTOJ7Wy30XLSRrJp/preview",
  "2023": "https://drive.google.com/file/d/1BTXowy65AXJHjE_2wq-OtxzIA9D8EEH3/preview",
  "2022": "https://drive.google.com/file/d/1moXngXeXafkuYlOZTwLeH_N1ToFrw1DK/preview",
},
},

  "6th": {
  Machine_Learning: {
    "2024": "https://drive.google.com/file/d/125qAq9tEcy6XhqGQVpFKNNBGQlbZmCBO/preview",
    "2023": "https://drive.google.com/file/d/1M7zPAfhPHWiee4Mq_wUmw8VKiTchF2SM/preview",
    "2022": "https://drive.google.com/file/d/1XSFzunCyG70Mw2KJUM2YjjlCnsOD-YD1/preview",
  },

  Artificial_Intelligence: {
    "2024": "https://drive.google.com/file/d/1c6TI9Jip6LPT2lLCMkO9mBK8KGkWrANY/preview",
    "2023": "https://drive.google.com/file/d/1sOIGNY473EmzFxtzTq_BpK0iaVhtOViy/preview",
    "2022": "https://drive.google.com/file/d/1QOGvMEsZaNNez_tef7MYbvsPRsARfTWr/preview",
  },

  Universal_Human_Values: {
    "2024": "https://drive.google.com/file/d/1RlrpGjoT7xFLkKYJ8-BzbCKvLPH7q7QV/preview",
  },

  Cloud_Computing: {
    "2024": "https://drive.google.com/file/d/1RcIriSSNIPfUhvqlXdjYm0QYQHjNlMGA/preview",
    "2023": "https://drive.google.com/file/d/1-uLxf6v5l_R55hxt3bXfFR_oayFACa2N/preview",
  },

  // CV: {
  //   "2024": "",
  //   "2023": "",
  //   "2020": "",
  // },

  Software_Project_Management: {
    "2024": "https://drive.google.com/file/d/1w_Zf9BDNldGqKgYZU4AHa3UGSf_EqJrd/preview",
    "2023": "https://drive.google.com/file/d/195w7DW2msLvga6kT0R-ruttaFcB3pS5i/preview",
    "2019": "https://drive.google.com/file/d/1UE0qGWnJK8ihAw-zEVhQu8DyZw2EmPrW/preview",
  },

  Natural_Language_Processing: {
    "2024": "https://drive.google.com/file/d/1UE0qGWnJK8ihAw-zEVhQu8DyZw2EmPrW/preview",
    "2023": "https://drive.google.com/file/d/1aXBD1m1T123s392OpwuSH9ewmaSLg5gS/preview",
    "2022": "https://drive.google.com/file/d/10KUEMxzBHJNoO-YZgVYgGD88rcIPDMeb/preview",
  },

  Microprocessor: {
    "2015": "https://drive.google.com/file/d/1raOCIDqdwJPt27sRUy9FJmJ1oNzxMh87/preview",
    "2020": "https://drive.google.com/file/d/1-v-mMHVYcuNfNQU8IECa2fWDWrqjC8eC/preview",
    "2022": "https://drive.google.com/file/d/1dtC4-sULz1B3Iq9OGtesfsged_MLIrKh/preview",
  },

  Data_Mining: {
    "2025":"https://drive.google.com/file/d/1WzoFBG490BJisZsDwj4rkjwjw8ci_M6u/preview",
    "2024":"https://drive.google.com/file/d/1sChA6jKadcSe1B0uJr3G4EnRtBilUqBO/preview",
    "2024B":"https://drive.google.com/file/d/18hF-R273Ej-BLrWxqeDhAoHJpTyrv7Ot/preview",
  },

  Compiler: {
    "2024":"https://drive.google.com/file/d/1VSkajJTnsWPlde42p4wRFSoEN6jJ1gLr/preview",
    "2025":"https://drive.google.com/file/d/1qjjodDLfTCSt_HKjOkemz7KlHkUUzQmq/preview",
    "2024B": "https://drive.google.com/file/d/1jVt1aLLSMTElj3Rwrv827WmRAzNIkg7a/preview",
    "2023" : "https://drive.google.com/file/d/1a8iWRTygXChySGfGKzbPKQaR7Ih_2XW3/preview",
  },
},
};

const RESOURCE_MAP = [
  {
    subject: "DBMS",
    playlist: "https://youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y&si=Z9CqHAQsF66cq6se",
  },
  {
    subject: "Operating Systems",
    playlist: "https://youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p&si=AFS1cvpXhpB-WvCx",
  },
  {
    subject: "Discrete Mathematics",
    playlist: "https://youtube.com/playlist?list=PLxCzCOWd7aiH2wwES9vPWsEL6ipTaUSl3&si=FIxqu12-A8H-rOmR",
  },
  {
    subject: "Computer Organization & Architecture",
    playlist: "https://youtube.com/playlist?list=PLdaj4mrS1BKBKic8N5CcipttgvfHiX_vg&si=9k4mq9Iil8xTpqMI",
  },
  {
    subject: "Object Oriented Programming",
    playlist: "https://youtube.com/playlist?list=PL9gnSGHSqcno1G3XjUbwzXHL8_EttOuKk&si=SmfruGUHnyCtLvRd",
  },
  {
    subject: "Information and Theory Coding",
    playlist: "https://youtube.com/playlist?list=PLV8vIYTIdSnaigcBvSa_S1NVdHhJHz9a4&si=OdCCbMBb_Ro2u5Kg",
  },
];


export default function PYQSection() {
  const [semester, setSemester] = useState<SemesterType>("4th");
  const [subject, setSubject] = useState("PS");
  const [year, setYear] = useState("2022");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const clerk = useClerk();

  const [pendingView, setPendingView] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const lastPaidDocRef = useRef<string | null>(null);

  const subjects = Object.keys(PYQ_MAP[semester]);
  const years = Object.keys(PYQ_MAP[semester][subject]);

  const openPdf = () => {
  const url = PYQ_MAP[semester][subject][year];

  if (!url) {
    alert("Paper not available yet");
    return false;
  }

  setPdfUrl(url);
  return true;
};


  const whatsappShare = () => {
    const text = encodeURIComponent(
      `Hey! I found the KIIT ${subject} (${year}) Previous Year Questions here:`
    );
    window.open(
      `https://wa.me/?text=${text}%20https://vfound.in/kiit`,
      "_blank"
    );
  };

  const currentDocKey = `${semester}|${subject}|${year}`;


  const handleViewDocument = async () => {
  // 🔒 First check availability (NO AUTH, NO CREDIT)
  const isAvailable = !!PYQ_MAP[semester][subject][year];

  if (!isAvailable) {
    alert("Paper not available yet");
    return;
  }

  if (!isSignedIn) {
    setPendingView(true);
    clerk.openSignIn();
    return;
  }

  if (!user) return;

  // ✅ If already paid for this document, just open it
  if (lastPaidDocRef.current === currentDocKey) {
    openPdf();
    return;
  }

  setShowToast(true);

  const usage = await consumeCredit(user.id, "pyq_view");

  if (!usage.allowed) {
    alert("You have reached your PYQ viewing limit. Please upgrade.");
    return;
  }

  // ✅ Mark this document as paid
  lastPaidDocRef.current = currentDocKey;

  openPdf();
};



  useEffect(() => {
    if (isSignedIn && pendingView) {
      setPendingView(false);
      handleViewDocument();
    }
  }, [isSignedIn, pendingView]);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-6xl mx-auto">
        
        {/* --- DESKTOP OPTIMIZED HEADER --- */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
  Academic Archive <br /> <br />{" "}
  <span className="inline-flex items-center gap-2 text-green-500 text-base sm:text-5xl font-semibold">
    <span>🎓</span> Only for KIIT Students
  </span>
</h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Boost your exam preparation with our organized collection of KIIT Previous Year Questions. 
            Select your semester and subject to access the archive.
          </p>
        </div>

        {/* --- SELECTION PANEL --- */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-10">
          
          {/* Step 1: Semester */}
          <div className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-5">01. Select Semester</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["4th", "6th"] as SemesterType[]).map((sem) => (
                <button
                  key={sem}
                  onClick={() => {
                    setSemester(sem);
                    const firstSub = Object.keys(PYQ_MAP[sem])[0];
                    setSubject(firstSub);
                    setYear(Object.keys(PYQ_MAP[sem][firstSub])[0]);
                  }}
                  className={`p-6 rounded-2xl border-2 text-left transition-all duration-200
                    ${semester === sem 
                      ? "bg-indigo-50/40 border-indigo-500 shadow-md" 
                      : "bg-white border-slate-100 hover:border-slate-200"}`}
                >
                  <span className={`text-xs font-bold ${semester === sem ? "text-indigo-600" : "text-slate-400"}`}>Current Selection</span>
                  <p className={`text-2xl font-bold ${semester === sem ? "text-indigo-900" : "text-slate-700"}`}>{sem} Semester</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Subjects */}
          <div className="mb-10">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-5">02. Choose Subject</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => {
                    setSubject(sub);
                    setYear(Object.keys(PYQ_MAP[semester][sub])[0]);
                  }}
                  className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all
                    ${subject === sub
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Year & Final Actions */}
          <div className="pt-8 border-t border-slate-100 flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="w-full lg:w-auto">
              <p className="text-xs font-bold text-slate-400 uppercase mb-3 text-center lg:text-left">Available Years</p>
              <div className="flex justify-center lg:justify-start gap-2">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`px-6 py-2 rounded-full text-sm font-bold border transition-all
                      ${year === y
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100"
                        : "bg-white text-slate-500 border-slate-200"}`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* View Document button */}
      <button
        onClick={handleViewDocument}
        className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-100 active:scale-[0.98]"
      >
        View Document
      </button>

      <CreditUsedToast
        show={showToast}
        onClose={() => setShowToast(false)}
      />
          </div>
  </div>
</div>

<hr className="mt-10 bg-gray-400 h-0.5"/>

{/* --- RESOURCE RECOMMENDATIONS --- */}
<div className="mt-20">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-10"
  >
    <h2 className="text-3xl font-bold text-slate-900 mb-3">
      📌 Recommended Learning Resources
    </h2>
    <p className="text-slate-600 max-w-3xl">
      Hand-picked YouTube playlists to strengthen core concepts and improve exam-oriented understanding for KIIT curriculum.
    </p>
  </motion.div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {RESOURCE_MAP.map((res, idx) => (
      <motion.a
        key={res.subject}
        href={res.playlist}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.05 }}
        className="bg-red-100 border border-red-300 rounded-2xl p-6 hover:shadow-lg transition-all"
      >
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          {res.subject}
        </h3>
        <p className="text-base text-slate-600 mb-4">
          Tumhare seniors bhi in playlist se he padhe the 
        </p>
        <span className="text-indigo-600 text-sm font-bold">
          Watch Playlist →
        </span>
      </motion.a>
    ))}
  </div>

  {/* <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    className="mt-10 text-3xl text-slate-500 italic"
  >
    Explore our tool's, Build specially for Young Developers
  </motion.p> */}
</div>


      </section>

      {/* --- MODAL --- */}
      {pdfUrl && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-0 sm:p-6">
          <div className="bg-white w-full max-w-5xl h-full sm:h-[90vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b flex justify-between items-center bg-white">
              <span className="font-bold text-slate-700 text-sm sm:text-base">
                {subject} • {semester} Sem • {year}
              </span>
              <button
                onClick={() => setPdfUrl(null)}
                className="p-2 hover:bg-slate-300 rounded-full transition-colors text-gray-800 font-extrabold ring-1"
              >
                ✕
              </button>
            </div>

            <iframe
              src={pdfUrl}
              className="flex-1 w-full bg-slate-50"
              title="PDF Preview"
            />

            <div className="p-4 bg-slate-50 border-t flex justify-end">
              <button
                onClick={whatsappShare}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-100"
              >
                Send to WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}