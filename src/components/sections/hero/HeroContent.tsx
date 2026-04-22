"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

const HEADING_LINE1 = "We build things";
const HEADING_LINE2_PARTS = [
  { text: "that just ", accent: false },
  { text: "work.", accent: true },
];

function WordReveal({ words, delay = 0 }: { words: string; delay?: number }) {
  return (
    <>
      {words.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: EASE_OUT_EXPO,
                delay: delay + i * 0.07,
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        className="glass-light rounded-3xl px-8 py-12 md:px-16 md:py-16 max-w-3xl w-full"
      >
        {/* Eyebrow */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } } }}
          className="mb-6"
        >
          <Badge variant="accent">Digital Agency</Badge>
        </motion.div>

        {/* H1 */}
        <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight text-text-primary mb-3">
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
          >
            <WordReveal words={HEADING_LINE1} delay={0.1} />
          </motion.div>
          <div className="mt-1">
            {HEADING_LINE2_PARTS.map((part, i) => (
              <motion.span
                key={i}
                className={`inline-block mr-[0.12em] ${part.accent ? "text-accent-lavender" : ""}`}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.4 + i * 0.08 },
                  },
                }}
              >
                {part.text}
              </motion.span>
            ))}
          </div>
        </h1>

        {/* Subline */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.9 } },
          }}
          className="text-text-secondary text-lg md:text-xl leading-relaxed mt-6 mb-10"
        >
          Premium design &amp; engineering for brands that mean it.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 1.1 } },
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MagneticButton>
            <Button size="lg" onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}>
              See Our Work
            </Button>
          </MagneticButton>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get in Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-1"
      >
        <span className="text-xs font-medium text-text-muted tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-text-muted animate-scroll-pulse" />
      </motion.div>
    </div>
  );
}
