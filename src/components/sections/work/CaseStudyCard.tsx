"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { CaseStudy } from "./constants";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: study.gradient }}
    >
      {/* Overlay */}
      <motion.div
        variants={{
          rest: { opacity: 0.25 },
          hover: { opacity: 0.55 },
        }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        className="absolute inset-0 bg-bg-dark"
      />

      {/* Scale on hover */}
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.04 },
        }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="absolute inset-0"
        style={{ background: study.gradient }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <Badge variant="dark" className="mb-3 self-start">{study.category}</Badge>
        <h3 className="font-display font-bold text-3xl text-white mb-2">{study.client}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-4">{study.outcome}</p>

        {/* Reveal link */}
        <motion.div
          variants={{
            rest: { opacity: 0, y: 12 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          className="inline-flex items-center gap-2 text-white font-medium text-sm"
        >
          View Case <ArrowRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}
