"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { BigTextMarquee } from "@/components/ui/BigTextMarquee";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We dig deep. Brand audits, competitor analysis, user interviews — we learn everything about your space before touching a single pixel.",
    tag: "Strategy",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Bold visual systems built for impact. Typography that commands. Layouts that breathe. Color that converts.",
    tag: "Design",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Next.js, TypeScript, bulletproof architecture. Animations that feel alive. Performance scores that make engineers jealous.",
    tag: "Engineering",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Continuous deployment, real monitoring, post-launch support. We're not done when the site goes live — we're just getting started.",
    tag: "Growth",
  },
];

export function ProcessSection() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll<HTMLElement>("li");

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="bg-bg-light py-0 overflow-hidden">
      {/* Heading strip */}
      <div className="border-b border-text-muted/10 py-16">
        <BigTextMarquee
          text="HOW WE WORK"
          repeat={6}
          textClassName="text-[3.5rem] md:text-[5.5rem] text-text-primary/07"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mb-20"
        >
          <p className="text-xs font-semibold tracking-[0.25em] text-accent-lavender uppercase mb-3">Process</p>
          <h2 className="font-display font-extrabold text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-tight text-text-primary">
            Our method.<br />
            <span className="text-accent-lavender">Not mystery.</span>
          </h2>
        </motion.div>

        <ul ref={listRef} className="divide-y divide-text-muted/10">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-8 py-10 group opacity-0"
            >
              {/* Number */}
              <span className="font-display font-extrabold text-7xl md:text-9xl leading-none text-text-muted/15 group-hover:text-accent-lavender transition-colors duration-500 w-28 md:w-40 text-right">
                {step.number}
              </span>

              {/* Content */}
              <div>
                <h3 className="font-display font-extrabold text-3xl md:text-5xl text-text-primary mb-3 group-hover:text-accent-lavender transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-base leading-relaxed max-w-lg font-body">
                  {step.description}
                </p>
              </div>

              {/* Tag */}
              <span className="hidden md:block text-xs font-semibold text-text-muted tracking-[0.15em] uppercase bg-bg-elevated px-4 py-2 rounded-full group-hover:bg-accent-lavender/10 group-hover:text-accent-lavender transition-all duration-300">
                {step.tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
