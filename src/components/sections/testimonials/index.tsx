"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

const TESTIMONIALS = [
  {
    quote:
      "Just Website didn't just build us a site — they built us a brand weapon. Traffic up 3× in 60 days. I can't stop staring at it.",
    author: "Sarah Chen",
    role: "CEO, Helix Studio",
    accent: "lavender",
  },
  {
    quote:
      "The animations alone are worth it. Every investor who sees our site thinks we raised a Series B just to build it. We hadn't.",
    author: "Marcus Webb",
    role: "Founder, Orbit Platform",
    accent: "cyan",
  },
  {
    quote:
      "Delivered in 3 weeks. Zero revisions needed. They understood the brief better than we did. Terrifyingly good.",
    author: "Priya Nair",
    role: "CPO, Pulse Systems",
    accent: "coral",
  },
];

const ACCENT_COLORS: Record<string, string> = {
  lavender: "#7C6EFF",
  cyan: "#14B8A6",
  coral: "#F97373",
};

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[active];
  const accentColor = ACCENT_COLORS[current.accent];

  return (
    <section className="bg-bg-dark py-36 px-6 overflow-hidden relative">
      {/* Background accent blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-[120px] pointer-events-none transition-colors duration-700 animate-blob"
        style={{ background: accentColor }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-16 text-center"
          style={{ color: accentColor }}
        >
          What Clients Say
        </motion.p>

        {/* Quote */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="text-center"
          >
            <blockquote className="font-display font-bold text-[clamp(1.6rem,4vw,3.2rem)] leading-[1.1] text-white mb-12 tracking-tight">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="flex flex-col items-center gap-1">
              <div
                className="w-10 h-10 rounded-full mb-3 flex items-center justify-center font-display font-bold text-sm text-white"
                style={{ background: accentColor }}
              >
                {current.author[0]}
              </div>
              <span className="text-white font-semibold text-sm">{current.author}</span>
              <span className="text-white/35 text-xs font-body">{current.role}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-16">
          <button
            onClick={() => go(-1)}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                className="h-1 rounded-full transition-all duration-400"
                style={{
                  width: i === active ? 28 : 8,
                  background: i === active ? accentColor : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
