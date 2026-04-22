"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

const NAV_LINKS = [
  { label: "Work",     href: "#work",     num: "01" },
  { label: "Services", href: "#services", num: "02" },
  { label: "Process",  href: "#process",  num: "03" },
  { label: "About",    href: "#about",    num: "04" },
  { label: "Contact",  href: "#contact",  num: "05" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <>
      {/* Header bar */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 2.4 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 transition-all duration-500",
          scrolled ? "py-4 bg-bg-darker/90 backdrop-blur-xl border-b border-white/[0.05]" : "py-6"
        )}
      >
        {/* Logo */}
        <a href="#" className="font-display font-extrabold text-white text-lg tracking-tight">
          JW<span className="text-accent-lavender">.</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="relative text-sm font-medium text-white/40 hover:text-white transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent-lavender origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-white/8 border border-white/10 text-white text-sm font-medium hover:bg-accent-lavender hover:border-accent-lavender transition-all duration-300"
          >
            Let&apos;s Talk
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="flex flex-col gap-[5px] p-2 group"
          >
            <span className={cn("block h-[1.5px] bg-white transition-all duration-400 origin-center", menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6")} />
            <span className={cn("block h-[1.5px] bg-white transition-all duration-400", menuOpen ? "opacity-0 w-4" : "w-4")} />
            <span className={cn("block h-[1.5px] bg-white transition-all duration-400 origin-center", menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6")} />
          </button>
        </div>
      </motion.header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-bg-darker/95 backdrop-blur-2xl flex flex-col justify-between px-8 md:px-16 pt-28 pb-12"
          >
            {/* Nav items */}
            <nav className="flex flex-col gap-0 divide-y divide-white/[0.06]">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.05 * i }}
                  className="flex items-center justify-between py-6 group text-left w-full"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="text-white/20 text-xs font-mono">{link.num}</span>
                    <span className="font-display font-extrabold text-[clamp(2.5rem,8vw,6rem)] leading-none text-white group-hover:text-accent-lavender transition-colors duration-300 tracking-tight">
                      {link.label}
                    </span>
                  </div>
                  <span className="text-white/20 text-2xl group-hover:text-accent-lavender group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Footer row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.06]"
            >
              <span className="font-display font-extrabold text-white/20 text-sm">Just Website</span>
              <span className="text-white/25 text-xs font-body">hello@justwebsite.co</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
