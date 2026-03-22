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
  "2023": "https://drive.google.com/file/u/0/d/1KU0QbDw3kUZdmIeBv3pAVtBXGitNxRsH/preview",
  "2022": "https://drive.google.com/file/d/1V4jq2n8RHkcWaF1w75Z202ep8K9zoeFs/preview",
},


  Database_Management_System: {
    // "2025": "https://drive.google.com/file/d/11b1-RgvTgHqXGbySlncvWaTZ1DsNjIfA/preview",
    "2024A": "https://drive.google.com/file/d/1tOsmYEn840vIH2zFJyjXAwmKEoUINxVn/preview",
    "2024B": "https://drive.google.com/file/d/1rRZyKEccj4Kiaz0ZmfncxilVKDQiDFih/preview",
    "2022": "https://drive.google.com/file/d/1K4F2QH15pD36J3UDKp7czXQyA5eGYC2w/preview",
    "2023": "https://drive.google.com/file/d/1OPl5DeDvQT49DlEgmvP7frsHHRJMFL8D/preview",
  },

  Operating_System: {
    "2024A": "https://drive.google.com/file/d/13ELfzsFddx6M6CmSxE1qtgsEOvp0J1KJ/preview",
    "2024B": "https://drive.google.com/file/d/1qEizAcqpoekqHb_GhNoUj-o4UY5AcuKZ/preview",
    "2022": "https://drive.google.com/file/d/1Py071m0N2BRlmPVfcTZiFBa9DdYb6zQL/preview",
    "2023": "https://drive.google.com/file/d/1gA3cXH87_0g_g7bZrm68QAtgraVdR5-o/preview",
    "2025": "https://drive.google.com/file/d/1rripQ-onAy3EzXBkW7kGJITsy4nAYgFT/preview",
  },

  Information_Theory_Coding: {
    "2025": "https://drive.google.com/file/d/10KT32zcnoTSH0UX--4MHgODO6fOteGiM/preview",
    "2024": "https://drive.google.com/file/d/1HUGbEKPCAVppej-QoXvQMq0C2kYb5JqL/preview",
    "2023": "https://drive.google.com/file/d/1x-JfsR1pQu5B_jOgN7RQQ92wZ-Z5Srs5/preview",
  },

  Computer_Organization_Architecture: {
    "2025": "https://drive.google.com/file/d/139Ka9S0lDY9FK_R8xy8lIPPGXvP8qqFH/preview",
    "2024": "https://drive.google.com/file/d/1uz70WD2zQThbjKsFIQv2xrV4RVr69v_J/preview",
    "2023A": "https://drive.google.com/file/d/1_nMz2Rn7aCUl5yHP24JIWfIj0D9ITAxm/preview",
    "2023B":"https://drive.google.com/file/d/1eFYtjGXEz6F8QAyKS9apY62SkaXs-cC4/preview",
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
    "2025":"https://drive.google.com/file/d/15-7qrWTlndntyMZP7rIMvvu83I56pbJA/preview",
    "2024": "https://drive.google.com/file/d/1c4dzBDmLAp41hJy3gO7HhzRHen9mUEu3/preview",
    "2022": "https://drive.google.com/file/d/1U3qU1pFskxhBCRqI_7eVm07dAFqKGnCA/preview",
    "2023": "https://drive.google.com/file/d/1Nb5_nJ4mRQne3SJgXbf0O09hcwvzYfTO/preview",
  },

  Organizational_Behaviour: {
    "2025": "https://drive.google.com/file/d/1U03dah6hCHL8pA8VgG-XxysXFl-cDs8A/preview",
    "2024": "https://drive.google.com/file/d/1oIzh9TOBPGO57ArNyuisUdvzH9R1YHCP/preview",
    "2023": "https://drive.google.com/file/d/1rAxU74ht1RhzT7vEBTbnsakVfnZBCcUs/preview",
  },

  Economics_of_Development: {
    "2025": "https://drive.google.com/file/d/1STnWVcltTPxFdpJbL1T4BMjny_FghFEo/preview",
    "2024A": "https://drive.google.com/file/d/1ndkH_ihh05dW4GVDkVNLNAjNFih4TWdA/preview",
    "2024B":"https://drive.google.com/file/d/19M-52PjetYgkHhC8MNvn8XXNastCsPh3/preview",
    "2023": "https://drive.google.com/file/d/1QIcNBHLhMdrwZrftQh-obFQY-iYbmlDn/preview",
  },

  // Ye mid sems ka he hai
  Engineering_Economics:{
    "2024A" :"https://drive.google.com/file/d/1gYt8XNGcv3mhnBL8_iLbfG7bdu6i1jfu/preview",
    "2024B" : "https://drive.google.com/file/d/1mEuAeD8TQbFrpAq7iADnN0zxLqrwHcEt/preview",
    "2025A": "https://drive.google.com/file/d/1FkkcQaJwpay1871qYQkT4_xQ8vfPpZkk/preview",
    "2025B" : "https://drive.google.com/file/d/1eFMjBTXcTMV3Jk05gLpcfGZx14BNvLKg/preview",
  },

  Internatinal_Economic_Corp:{
    "2025":"https://drive.google.com/file/d/1HAr9yXYrHkjE6v5e9gBhczK10cSdyE1o/preview",
    "2024A":"https://drive.google.com/file/d/1xQnZxVFO8H_TxG4ntoQJCM2NrJHhJKQC/preview",
    "2024B":"https://drive.google.com/file/d/1rgv8lxfI-3xt6TtXaze8hrGxj79PiUKH/preview",
    "2023":"https://drive.google.com/file/d/1MvDH5K8jv_iwOTljOjBwqIaewJkKmy2-/preview",
  },

  Object_Oriented_Programming_Java: {
    "2025":"https://drive.google.com/file/d/1bPkzHDvvq-I1WISWShCM51LQEfpxp2Y_/preview",
    "2024A": "https://drive.google.com/file/d/16hEZZ0rTDyDg0V0Lcyzl8rHn4uHQpKMr/preview",
    "2024B":"https://drive.google.com/file/d/1G1K0cjCdjaFtTCT8YN99pSWo-fI5uT6z/preview",
    "2023A": "https://drive.google.com/file/d/1BGIX-PCFaQ8WZsDjSQf8DN9K0vQFquMS/preview",
    "2022": "https://drive.google.com/file/d/1yZm9LgA4B1jO0liK7CgWPOm0cGmpwawk/preview",
},
},

  "6th": {
  Machine_Learning: {
    "2025A":"https://drive.google.com/file/d/14HqVoeQAflfSHMN9Wjw3cYnBDjQFvRDP/preview",
    "2025B":"https://drive.google.com/file/d/1h07awmw2hdif9YeOAllA4S2iJabyOTkE/preview",
    "2025C":"https://drive.google.com/file/d/1h07awmw2hdif9YeOAllA4S2iJabyOTkE/preview",
    "2025D":"https://drive.google.com/file/d/1bt7M_Q9SBNfBBxK-Capl7alekZe2yp8u/preview",
    "2024A": "https://drive.google.com/file/d/1oMGaQntZw1oGdL-h6m7u58PMlb45EPuL/preview",
    "2023A": "https://drive.google.com/file/d/13mb8CIl5kgUclVklnezYhZOlLokKSn5H/preview",
    "2023B": "https://drive.google.com/file/d/13mb8CIl5kgUclVklnezYhZOlLokKSn5H/preview",
  },

  Artificial_Intelligence: {
    "2025A":"https://drive.google.com/file/d/10sG7tivAn87_TcCdFxzGIgj5Z8OPfKJ0/preview",
    "2025B": "https://drive.google.com/file/d/1_d0p-hkfIVV1b2rYfU_vORxOSDaYQabd/preview",
    "2024":"https://drive.google.com/file/d/1V-7nxP4-OHqh9F89H8DYnK2U4uYYtSbA/preview",
    "2023A": "https://drive.google.com/file/d/1DQTsvQYqFi0Zyt2dsGqBewTvVVBcZjX0/preview",
    "2022": "https://drive.google.com/file/d/1L3FvZ3X5T_lcy_BRw13joxRqlwF148dw/preview",
  },

  Universal_Human_Values: {
    "2025": "https://drive.google.com/file/d/1X0BaikkwQbYZ2ywczYIqH1iAxRX0fCQq/preview",
    "2024":"https://drive.google.com/file/d/16o6QkWCuJ5_OUBzOgAge8QH0nd7D_Fl_/preview",
  },

  Cloud_Computing: {
    "2025":"https://drive.google.com/file/d/1Mq4oJy1m_itENDFTwTsTqJfQiiyAFJAu/preview",
    "2024": "https://drive.google.com/file/d/14P-JBoc2pEiE1qO2100PMJfzmYD0jcVn/preview",
    "2023": "https://drive.google.com/file/d/1jqf4FxpMrPgHITzqffRfp1LOwEJj7lBJ/preview",
  },

  // CV: {
  //   "2024": "",
  //   "2023": "",
  //   "2020": "",
  // },

  Software_Project_Management: {
    "2025":"https://drive.google.com/file/d/17XfQ31krDoRvc2mww_eQVVcFC4nAzw4m/preview",
    "2023": "https://drive.google.com/file/d/1Cgi9mYCH-NN1fb1JUNg3fP9RfQU7Pu9H/preview",
    "2024": "https://drive.google.com/file/d/1aD19Clwi0mtfn4uPtNeFQJ2i-ndQ9qxV/preview",
    "2021": "https://drive.google.com/file/d/1xM_7GzZhQEcly9pth1DzttKjUTKWU5oB/preview",
  },

  // Natural_Language_Processing: {
  //   "2024": "https://drive.google.com/file/d/1UE0qGWnJK8ihAw-zEVhQu8DyZw2EmPrW/preview",
  //   "2023": "https://drive.google.com/file/d/1aXBD1m1T123s392OpwuSH9ewmaSLg5gS/preview",
  //   "2022": "https://drive.google.com/file/d/10KUEMxzBHJNoO-YZgVYgGD88rcIPDMeb/preview",
  // },

  // Microprocessor: {
  //   "2015": "https://drive.google.com/file/d/1raOCIDqdwJPt27sRUy9FJmJ1oNzxMh87/preview",
  //   "2020": "https://drive.google.com/file/d/1-v-mMHVYcuNfNQU8IECa2fWDWrqjC8eC/preview",
  //   "2022": "https://drive.google.com/file/d/1dtC4-sULz1B3Iq9OGtesfsged_MLIrKh/preview",
  // },

  // Data_Mining: {
  //   "2025":"https://drive.google.com/file/d/1WzoFBG490BJisZsDwj4rkjwjw8ci_M6u/preview",
  //   "2024":"https://drive.google.com/file/d/1sChA6jKadcSe1B0uJr3G4EnRtBilUqBO/preview",
  //   "2024B":"https://drive.google.com/file/d/18hF-R273Ej-BLrWxqeDhAoHJpTyrv7Ot/preview",
  // },

  // Compiler: {
  //   "2024":"https://drive.google.com/file/d/1VSkajJTnsWPlde42p4wRFSoEN6jJ1gLr/preview",
  //   "2025":"https://drive.google.com/file/d/1qjjodDLfTCSt_HKjOkemz7KlHkUUzQmq/preview",
  //   "2024B": "https://drive.google.com/file/d/1jVt1aLLSMTElj3Rwrv827WmRAzNIkg7a/preview",
  //   "2023" : "https://drive.google.com/file/d/1a8iWRTygXChySGfGKzbPKQaR7Ih_2XW3/preview",
  // },
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

  if (lastPaidDocRef.current === currentDocKey) {
    openPdf();
    return;
  }

  // ✅ OPEN IMMEDIATELY
  openPdf();

  setShowToast(true);

  try {
    const usage = await consumeCredit(user.id, "pyq_view");

    if (!usage?.allowed) {
      alert("Limit reached");
      setPdfUrl(null); // close modal if needed
      return;
    }

    lastPaidDocRef.current = currentDocKey;
  } catch (err) {
    console.error("Credit error:", err);
  }
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

  <div className="w-full rounded-3xl bg-gradient-to-r from-pink-700 via-pink-600 to-pink-500 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between mt-20 mb-20">

  <div className="max-w-2xl text-white">
    <p className="uppercase text-sm tracking-widest text-pink-200 mb-3">
      Always Evolving
    </p>

    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
      We have engineered
      <span className="underline decoration-pink-200"> Intelligent </span>
      <span className="underline decoration-pink-200"> Agent </span> 
      for your <span className="underline decoration-pink-200 text-white">On Live </span> research and coding help without leaving your browser
    </h1>
  </div>

  <div className="mt-8 md:mt-0">
    <a href="/extension"
       className="bg-black text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-gray-900 transition shadow-lg">
       Try Extension →
    </a>
  </div>

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
    <div className="bg-white w-full max-w-6xl h-full sm:h-[90vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">

      {/* HEADER */}
      <div className="px-5 py-1 border-b flex justify-between items-center bg-white z-10">
        <span className="font-bold text-slate-700 text-sm sm:text-base">
          {subject} • {semester} Sem • {year}
        </span>

        {/* Header Watermark */}
        <span className="text-[10px] sm:text-xs text-gray-400 font-semibold text-right">
          Access All kinds of PDF from Vfound.in | Career Intelligence
        </span>

        <button
          onClick={() => setPdfUrl(null)}
          className="ml-3 p-2 hover:bg-slate-300 rounded-full transition-colors text-gray-800 font-extrabold ring-1"
        >
          ✕
        </button>
      </div>

      {/* CENTER WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
  <p className="text-gray-500 text-sm sm:text-2xl font-semibold opacity-25 rotate-[-25deg] text-center px-4 leading-snug">
    Available @ Vfound.in <br /> Career Intelligence
  </p>
</div>

      {/* PDF VIEW */}
      <iframe
        src={pdfUrl}
        className="flex-1 w-full bg-slate-50 z-0"
        title="PDF Preview"
      />

      {/* FOOTER */}
      <div className="px-5 py-2 bg-slate-50 border-t flex justify-between items-center z-10">
        
        {/* Footer Watermark */}
        <span className="text-xl sm:text-xs text-gray-400 font-semibold">
          Access All kinds of PDF from Vfound.in
        </span>

        <button
          onClick={whatsappShare}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-100"
        >
          Share your Friend
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}