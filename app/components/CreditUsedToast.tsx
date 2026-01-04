"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  show: boolean;
  onClose?: () => void;
};

const AUTO_CLOSE_MS = 4000;

export default function CreditUsedToast({ show, onClose }: Props) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!show) {
      setProgress(100);
      return;
    }

    setProgress(100);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (AUTO_CLOSE_MS / 100));
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 100);

    const timer = setTimeout(() => {
      onClose?.();
    }, AUTO_CLOSE_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [show, onClose]);

  return (
    <>
      {/* Desktop / Tablet */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed z-50 hidden md:block top-6 right-8"
          >
            <div className="relative overflow-hidden bg-green-800 text-white font-medium">
              {/* Main Content */}
              <div className="px-5 py-3 flex items-center gap-4">
                <span className="text-xl font-bold">-1</span>
                <span className="text-lg">Credit Deducted</span>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 h-1.5 bg-green-500 w-full origin-left">
                <motion.div
                  className="h-full bg-green-300"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed z-50 md:hidden top-6 right-6"
          >
            <div className="relative overflow-hidden bg-green-700 text-white font-medium text-sm shadow-xl">
              {/* Main Content */}
              <div className="px-6 py-4 flex items-center gap-3">
                <span className="text-xl font-bold">-1</span>
                <span>Credit Used</span>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 h-1 bg-green-500 w-full origin-left">
                <motion.div
                  className="h-full bg-green-300"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}