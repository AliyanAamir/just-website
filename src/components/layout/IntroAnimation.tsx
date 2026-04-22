"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-bg-darker overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Wipe panels */}
          <motion.div
            className="absolute inset-0 bg-accent-lavender origin-right"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.0 }}
          />
          <motion.div
            className="absolute inset-0 bg-bg-dark origin-right"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.85 }}
          />

          {/* Wordmark */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <motion.span
              className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              Just Website
            </motion.span>
            <motion.div
              className="h-px bg-accent-lavender origin-left"
              initial={{ scaleX: 0, width: "100%" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              style={{ width: 220 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
