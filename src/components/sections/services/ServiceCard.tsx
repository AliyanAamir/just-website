"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "./constants";

interface ServiceCardProps { service: Service }

export function ServiceCard({ service }: ServiceCardProps) {
  const { icon: Icon, title, description } = service;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      className="group relative bg-bg-surface border border-text-muted/10 rounded-2xl p-8 flex flex-col gap-6 overflow-hidden cursor-pointer"
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 bg-accent-lavender"
        variants={{ rest: { scaleY: 0, originY: 1 }, hover: { scaleY: 1, originY: 1 } }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Content (above fill) */}
      <div className="relative z-10 flex flex-col gap-6 flex-1">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-bg-elevated group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
          <Icon size={22} className="text-accent-lavender group-hover:text-white transition-colors duration-300" />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="font-display font-bold text-xl text-text-primary group-hover:text-white transition-colors duration-300 mb-2">
            {title}
          </h3>
          <p className="text-text-secondary group-hover:text-white/70 text-sm leading-relaxed font-body transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Arrow */}
        <ArrowUpRight
          size={20}
          className="text-text-muted group-hover:text-white self-end transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
    </motion.div>
  );
}
