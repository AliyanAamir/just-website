"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: "words" | "chars";
  once?: boolean;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  mode = "words",
  once = true,
}: SplitTextProps) {
  const items = mode === "chars" ? text.split("") : text.split(" ");

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.22em] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {items.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.75, ease: EASE_OUT_EXPO },
              },
            }}
          >
            {item === " " ? " " : item}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
