import { Lightbulb, Layers, Code2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

export const SERVICES: Service[] = [
  {
    icon: Lightbulb,
    title: "Creative Direction",
    description: "We shape ideas into visual narratives that command attention and drive action.",
    link: "#",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description: "Interfaces that feel inevitable. Designed for humans, optimized for metrics.",
    link: "#",
  },
  {
    icon: Code2,
    title: "Web Engineering",
    description: "Production-grade Next.js applications. Fast, accessible, bulletproof.",
    link: "#",
  },
  {
    icon: Sparkles,
    title: "Motion & Animation",
    description: "GSAP, Framer Motion, and raw canvas — breathing life into every pixel.",
    link: "#",
  },
];
