import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "dark";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-bg-elevated text-text-muted border border-text-muted/20",
    accent: "bg-accent-lavender/10 text-accent-lavender border border-accent-lavender/20",
    dark: "bg-white/10 text-white/60 border border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
