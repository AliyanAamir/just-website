"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/animations/easings";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div
          className={cn(
            "flex items-center gap-8 transition-all duration-500",
            "rounded-full border",
            scrolled
              ? "px-5 py-2.5 shadow-lg shadow-black/10 bg-white/90 border-white/60 backdrop-blur-xl"
              : "px-6 py-3 bg-white/70 border-white/40 backdrop-blur-lg"
          )}
        >
          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-text-primary text-sm tracking-tight shrink-0"
          >
            Just Website
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="relative px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-accent-lavender transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-accent-lavender scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <Button
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => handleNavClick("#contact")}
          >
            Get Started
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={cn("block w-5 h-0.5 bg-text-primary transition-all duration-300", menuOpen && "rotate-45 translate-y-2")} />
            <span className={cn("block w-5 h-0.5 bg-text-primary transition-all duration-300", menuOpen && "opacity-0")} />
            <span className={cn("block w-5 h-0.5 bg-text-primary transition-all duration-300", menuOpen && "-rotate-45 -translate-y-2")} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-24 left-4 right-4 z-40 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl p-6 md:hidden"
        >
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3 text-base font-medium text-text-secondary hover:text-accent-lavender rounded-xl hover:bg-bg-elevated transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
            <Button
              className="mt-2 w-full"
              onClick={() => handleNavClick("#contact")}
            >
              Get Started
            </Button>
          </nav>
        </motion.div>
      )}
    </>
  );
}
