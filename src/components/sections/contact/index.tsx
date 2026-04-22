"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { BigTextMarquee } from "@/components/ui/BigTextMarquee";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

export function ContactSection() {
  return (
    <section id="contact" className="bg-bg-dark py-0 overflow-hidden">
      {/* Big text stripe */}
      <div className="py-14 border-b border-white/[0.06]">
        <BigTextMarquee
          text="LET'S BUILD"
          repeat={6}
          textClassName="text-[4rem] md:text-[7rem] text-white/05"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — headline */}
          <div className="sticky top-24">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-accent-coral mb-6">
              Get In Touch
            </p>
            <h2 className="font-display font-extrabold text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-white mb-6">
              <SplitText text="Let's build" delay={0} />
              <br />
              <span className="text-accent-coral">
                <SplitText text="something" delay={0.15} />
              </span>
              <br />
              <SplitText text="great." delay={0.3} />
            </h2>
            <p className="text-white/35 text-base leading-relaxed font-body max-w-sm">
              Tell us about your project. We read every message and respond within 24 hours.
            </p>
          </div>

          {/* Right — form */}
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "Name", type: "text", placeholder: "Alex Johnson" },
                { label: "Email", type: "email", placeholder: "alex@company.com" },
              ].map((field) => (
                <motion.div key={field.label} variants={fadeUp}>
                  <label className="block text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-2.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm font-body focus:outline-none focus:border-accent-lavender/60 transition-colors duration-300"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp}>
              <label className="block text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-2.5">
                Project Brief
              </label>
              <textarea
                rows={5}
                placeholder="Tell us about your project, goals, and timeline..."
                className="w-full px-5 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm font-body focus:outline-none focus:border-accent-lavender/60 transition-colors duration-300 resize-none"
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <MagneticButton>
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-accent-lavender text-white font-display font-bold text-sm tracking-wide hover:shadow-[0_0_40px_rgba(124,110,255,0.5)] transition-all duration-300"
                >
                  Send Message
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </MagneticButton>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
