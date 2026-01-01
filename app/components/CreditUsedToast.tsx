"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  show: boolean;
  onClose?: () => void;
};

const AUTO_CLOSE_MS = 20000;

export default function CreditUsedToast({ show, onClose }: Props) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, AUTO_CLOSE_MS);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  return (
    <>
      {/* Desktop / Tablet */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -16, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed z-50 hidden md:flex top-6 right-6"
          >
            <div className="
              flex items-center
              px-6 py-3
              rounded-xl
              backdrop-blur-xl
              bg-amber-200/70
              border border-amber-300/40
              shadow-xl shadow-amber-900/10
              text-amber-950
              text-sm font-semibold tracking-wide
            ">
              <span className="text-black font-bold mr-2">-1</span>
              <span className="text-black font-bold">Credit</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -12, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed z-50 md:hidden top-4 right-4"
          >
            <div className="
              flex items-center gap-3
              px-5 py-3
              rounded-xl
              backdrop-blur-xl
              bg-amber-200/20
              border border-amber-300/40
              shadow-lg shadow-amber-900/10
              text-amber-950
              text-xs font-semibold
            ">
              <span className="uppercase text-[10px] text-amber-700 tracking-widest">
                Credit
              </span>
              <span className="opacity-90">
                1 used
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
