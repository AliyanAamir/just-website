"use client";

const TECH_ITEMS = [
  "Next.js", "Figma", "GSAP", "Framer Motion", "TypeScript",
  "Tailwind CSS", "Radix UI", "Vercel", "React", "Node.js",
];

export function MarqueeStrip() {
  const items = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="w-full bg-bg-elevated py-4 overflow-hidden border-y border-text-muted/10">
      <div className="flex animate-marquee gap-0" style={{ width: "max-content" }}>
        {items.map((item, i) => (
          <span
            key={i}
            className="px-6 text-sm font-medium text-text-muted tracking-wider whitespace-nowrap after:content-['·'] after:mx-6 after:text-text-muted/40"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
