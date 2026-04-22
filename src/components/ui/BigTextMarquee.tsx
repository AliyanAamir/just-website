"use client";

import { cn } from "@/lib/utils";

interface BigTextMarqueeProps {
  text: string;
  repeat?: number;
  reverse?: boolean;
  className?: string;
  textClassName?: string;
}

export function BigTextMarquee({
  text,
  repeat = 6,
  reverse = false,
  className,
  textClassName,
}: BigTextMarqueeProps) {
  const items = Array(repeat * 2).fill(text);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex whitespace-nowrap w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {items.map((t, i) => (
          <span
            key={i}
            className={cn(
              "inline-block font-display font-extrabold tracking-tight leading-none pr-8",
              textClassName
            )}
          >
            {t}
            <span className="text-accent-lavender mx-6 align-middle text-[0.6em]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
