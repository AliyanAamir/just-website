"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

export function ContactSection() {
  return (
    <section id="contact" className="bg-bg-dark py-36 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mb-12"
        >
          <Badge variant="dark" className="mb-4">Get In Touch</Badge>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-white leading-tight mb-4">
            Let&apos;s build something{" "}
            <span className="text-accent-coral">great.</span>
          </h2>
          <p className="text-white/50 text-lg">
            Tell us about your project. We read every message.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4 text-left"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div variants={fadeUp}>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Alex Johnson"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent-lavender transition-colors duration-200"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="alex@company.com"
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent-lavender transition-colors duration-200"
              />
            </motion.div>
          </div>

          {/* Message */}
          <motion.div variants={fadeUp}>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Tell us about your project, goals, and timeline..."
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent-lavender transition-colors duration-200 resize-none"
            />
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeUp} className="flex justify-center pt-2">
            <MagneticButton>
              <Button size="lg" className="w-full sm:w-auto px-12">
                Send Message
              </Button>
            </MagneticButton>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
