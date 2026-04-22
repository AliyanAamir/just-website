"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Badge } from "@/components/ui/Badge";
import { CaseStudyCard } from "./CaseStudyCard";
import { CASE_STUDIES } from "./constants";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

export function WorkSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll<HTMLElement>(".case-card");

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="bg-bg-dark py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mb-16 text-center"
        >
          <Badge variant="dark" className="mb-4">Selected Work</Badge>
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-white leading-tight">
            Projects that{" "}
            <span className="text-accent-cyan">move the needle.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div ref={cardsRef} className="flex flex-col gap-6">
          {CASE_STUDIES.map((study) => (
            <div key={study.id} className="case-card">
              <CaseStudyCard study={study} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
