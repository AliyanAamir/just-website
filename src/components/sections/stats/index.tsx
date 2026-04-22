"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "@/lib/animations/gsap";
import { BigTextMarquee } from "@/components/ui/BigTextMarquee";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

const STATS = [
  { value: 12,  suffix: "+", label: "Years of craft",     description: "Building web experiences since before it was cool." },
  { value: 80,  suffix: "+", label: "Projects shipped",   description: "From scrappy startups to Fortune 500 rebr&ands." },
  { value: 4.9, suffix: "★", label: "Average rating",     description: "Clients who come back — every single time." },
  { value: 0,   suffix: "",  label: "Excuses ever made",  description: "We deliver. Period." },
];

function CountUp({ to, suffix, duration = 1.8 }: { to: number; suffix: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const isFloat = to % 1 !== 0;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: to,
      duration,
      ease: "expo.out",
      onUpdate: () => {
        setDisplay(isFloat ? obj.val.toFixed(1) : String(Math.round(obj.val)));
      },
    });
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="bg-bg-dark-2 py-0 overflow-hidden">
      {/* Big marquee header */}
      <div className="py-16 border-y border-white/[0.06]">
        <BigTextMarquee
          text="RESULTS THAT SPEAK"
          repeat={5}
          textClassName="text-[4rem] md:text-[6rem] text-white/08"
        />
      </div>

      {/* Stats grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.1 }}
              className="bg-bg-dark-2 p-8 md:p-12 flex flex-col justify-between gap-6 group hover:bg-white/[0.03] transition-colors duration-500"
            >
              {/* Giant number */}
              <div className="font-display font-extrabold text-[clamp(4rem,8vw,7rem)] leading-none tracking-tight text-white group-hover:text-accent-lavender transition-colors duration-500">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label + desc */}
              <div>
                <div className="text-accent-lavender text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  {stat.label}
                </div>
                <div className="text-white/35 text-sm leading-relaxed font-body">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
