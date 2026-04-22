"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/animations/gsap";
import { Badge } from "@/components/ui/Badge";
import { STORY_PARAGRAPHS } from "./constants";

export function StoryBlock() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const paras = containerRef.current.querySelectorAll<HTMLElement>(".story-para");

    const ctx = gsap.context(() => {
      paras.forEach((para) => {
        gsap.fromTo(
          para,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: para,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="sticky top-28 flex flex-col gap-6">
      <Badge className="self-start">About Us</Badge>
      <h2 className="font-display font-semibold text-4xl md:text-5xl text-text-primary leading-tight">
        We obsess over <span className="text-accent-lavender">craft.</span>
      </h2>
      <div className="flex flex-col gap-5 mt-2">
        {STORY_PARAGRAPHS.map((para, i) => (
          <p key={i} className="story-para text-text-secondary text-base leading-relaxed opacity-0">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
