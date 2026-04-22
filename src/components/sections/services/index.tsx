"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Badge } from "@/components/ui/Badge";
import { ServiceCard } from "./ServiceCard";
import { SERVICES } from "./constants";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

export function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".service-card");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="bg-bg-base py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mb-16 text-center"
        >
          <Badge className="mb-4">What We Do</Badge>
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-text-primary leading-tight">
            Services built for{" "}
            <span className="text-accent-lavender">modern brands.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {SERVICES.map((service) => (
            <div key={service.title} className="service-card">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
