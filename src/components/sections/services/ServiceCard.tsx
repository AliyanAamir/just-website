"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Service } from "./constants";
import { cardHover } from "@/lib/animations/variants";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { icon: Icon, title, description, link } = service;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className="group bg-bg-surface rounded-2xl p-7 border border-text-muted/10 hover:border-accent-lavender/30 transition-colors duration-300 cursor-pointer flex flex-col gap-5"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-bg-elevated flex items-center justify-center group-hover:bg-accent-lavender/10 transition-colors duration-300">
        <Icon size={26} className="text-accent-lavender" />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="font-display font-semibold text-xl text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      </div>

      {/* Link */}
      <a
        href={link}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted group-hover:text-accent-lavender transition-colors duration-300"
      >
        Learn more
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
    </motion.div>
  );
}
