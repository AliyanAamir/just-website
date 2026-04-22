"use client";

import { motion } from "framer-motion";
import { BigTextMarquee } from "@/components/ui/BigTextMarquee";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

const CLIENTS = [
  "Helix Studio", "Orbit Platform", "Pulse Systems",
  "Novex Labs", "Arclight", "Beacon Co.",
  "Stratum", "Volt Agency", "Meridian",
];

export function ClientsSection() {
  return (
    <section className="bg-bg-light py-24 overflow-hidden border-y border-text-muted/10">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-text-muted mb-12"
      >
        Trusted by forward-thinking brands
      </motion.p>

      {/* Row 1 */}
      <div className="mb-4">
        <BigTextMarquee
          text={CLIENTS.slice(0, 5).join("  ·  ")}
          repeat={4}
          textClassName="text-2xl md:text-3xl text-text-primary/15"
        />
      </div>

      {/* Row 2 (reversed) */}
      <BigTextMarquee
        text={CLIENTS.slice(4).join("  ·  ")}
        repeat={4}
        reverse
        textClassName="text-2xl md:text-3xl text-text-primary/15"
      />
    </section>
  );
}
