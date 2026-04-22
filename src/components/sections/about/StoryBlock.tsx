"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/animations/gsap";
import { SplitText } from "@/components/ui/SplitText";

const STORY_PARAGRAPHS = [
  "Just Website was born from a simple belief — the web should be beautiful and fast. We've spent years mastering the tools that make that possible.",
  "We work with a small number of clients at a time. Not because we can't scale, but because we refuse to compromise on quality.",
  "Every project ships with production-grade code, obsessive attention to detail, and zero excuses.",
];

export function StoryBlock() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const paras = containerRef.current.querySelectorAll<HTMLElement>(".story-para");
    const ctx = gsap.context(() => {
      paras.forEach((p) => {
        gsap.fromTo(p,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85, ease: "expo.out",
            scrollTrigger: { trigger: p, start: "top 82%" } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="sticky top-24 flex flex-col gap-8">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent-lavender">About Us</p>
      <h2 className="font-display font-extrabold text-[clamp(3rem,5vw,4.5rem)] leading-[0.95] tracking-tight text-text-primary">
        <SplitText text="We obsess" delay={0} />
        <br />
        <SplitText text="over craft." delay={0.15} />
      </h2>
      <div className="flex flex-col gap-5">
        {STORY_PARAGRAPHS.map((p, i) => (
          <p key={i} className="story-para text-text-secondary text-base leading-relaxed font-body opacity-0">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
