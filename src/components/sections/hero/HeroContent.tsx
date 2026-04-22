"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

const LINE1 = ["We", "make"];
const LINE2 = ["brands", "go"];
const LINE3_ACCENT = "wild.";

export function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col justify-end min-h-screen px-6 md:px-12 lg:px-20 pb-20 pt-32">
      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
        className="flex items-center gap-2 mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
        <span className="text-xs font-medium text-white/40 tracking-[0.2em] uppercase">
          Available for projects — 2026
        </span>
      </motion.div>

      {/* Giant heading */}
      <div className="overflow-hidden">
        <h1 className="font-display font-extrabold leading-[0.9] tracking-[-0.03em] text-[clamp(72px,12vw,180px)]">
          {/* Line 1 */}
          <div className="flex flex-wrap items-baseline gap-x-[0.18em] overflow-hidden">
            {LINE1.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block text-white"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.3 + i * 0.1 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap items-baseline gap-x-[0.18em]">
            {LINE2.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block text-white"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.5 + i * 0.1 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Line 3 — accent */}
          <div className="overflow-hidden">
            <motion.span
              className="inline-block text-accent-lavender italic"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.75 }}
            >
              {LINE3_ACCENT}
            </motion.span>
          </div>
        </h1>
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 1.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-12"
      >
        {/* Sub copy */}
        <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-xs font-body">
          Premium design &amp; engineering for brands that refuse to blend in.
        </p>

        {/* CTA group */}
        <div className="flex items-center gap-4">
          <MagneticButton>
            <button
              onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-3 px-7 py-4 rounded-full bg-accent-lavender text-white font-display font-bold text-sm tracking-wide hover:bg-white hover:text-bg-dark transition-all duration-300 glow-lavender"
            >
              See Our Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </MagneticButton>

          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="text-white/50 hover:text-white text-sm font-medium transition-colors duration-300 underline underline-offset-4 decoration-white/20 hover:decoration-white"
          >
            Or say hello →
          </button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 right-8 md:right-12 lg:right-20 flex flex-col items-center gap-2 rotate-90 origin-bottom-right"
      >
        <span className="text-[10px] font-medium text-white/25 tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-12 h-px bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent-lavender"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "60%" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
