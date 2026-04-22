"use client";

import { motion } from "framer-motion";
import { STATS } from "./constants";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

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
          className="bg-bg-surface rounded-2xl p-7 border border-text-muted/10 shadow-sm"
        >
          <div className="font-display font-bold text-5xl text-accent-lavender mb-1">
            {stat.value}
          </div>
          <div className="text-text-secondary text-sm font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
