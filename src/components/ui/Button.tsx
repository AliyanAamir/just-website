"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 cursor-pointer select-none";

    const variants = {
      primary:
        "bg-accent-lavender text-white hover:shadow-[0_0_24px_rgba(124,110,255,0.5)] hover:scale-[1.02] active:scale-[0.98]",
      ghost:
        "bg-transparent text-text-primary border border-text-muted hover:border-accent-lavender hover:text-accent-lavender",
      outline:
        "bg-transparent text-white border border-white/20 hover:border-accent-lavender hover:text-accent-lavender",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
