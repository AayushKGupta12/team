"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // 👈 THIS IS THE MAGIC
        initial={{ opacity: 0.4, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.4, y: 0 }}
        transition={{
          duration: 0.22,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
