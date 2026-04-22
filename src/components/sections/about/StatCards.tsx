"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

const STATS = [
  { value: "12+", label: "Years Experience", description: "Building on the web since before Tailwind existed." },
  { value: "80+", label: "Projects Shipped",  description: "Each one better than the last." },
  { value: "4.9★", label: "Average Rating",   description: "On Clutch, Google, and word of mouth." },
];

export function StatCards() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="flex flex-col gap-4"
    >
      {STATS.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeUp}
          className="group border border-text-muted/10 rounded-2xl p-8 flex items-start gap-6 hover:border-accent-lavender/30 transition-all duration-500 hover:bg-accent-lavender/[0.03]"
        >
          <div className="font-display font-extrabold text-6xl leading-none text-accent-lavender min-w-[120px]">
            {stat.value}
          </div>
          <div>
            <div className="font-display font-bold text-lg text-text-primary mb-1">{stat.label}</div>
            <div className="text-text-secondary text-sm leading-relaxed font-body">{stat.description}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
