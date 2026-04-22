import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

export function GlassCard({ children, className, variant = "light" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        variant === "light" ? "glass-light" : "glass-dark",
        className
      )}
    >
      {children}
    </div>
  );
}
