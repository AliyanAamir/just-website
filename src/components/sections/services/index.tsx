"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/animations/gsap";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "./constants";
import { BigTextMarquee } from "@/components/ui/BigTextMarquee";
import { SplitText } from "@/components/ui/SplitText";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

export function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".service-card");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 75%" },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="bg-bg-light py-0 overflow-hidden">
      {/* Big marquee divider */}
      <div className="py-14 border-y border-text-muted/10">
        <BigTextMarquee
          text="WHAT WE DO"
          repeat={7}
          textClassName="text-[3rem] md:text-[5rem] text-text-primary/06"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-28">
        {/* Heading */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-display font-extrabold text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-text-primary">
            <SplitText text="Services built" delay={0} />
            <br />
            <SplitText text="for modern" delay={0.15} />
            <br />
            <span className="text-accent-lavender">
              <SplitText text="brands." delay={0.3} />
            </span>
          </h2>
          <p className="text-text-secondary text-base leading-relaxed max-w-xs font-body md:text-right">
            Full-stack creative studio covering strategy, design, engineering and motion.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service) => (
            <div key={service.title} className="service-card opacity-0">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
