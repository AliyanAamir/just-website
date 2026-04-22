import { X, GitBranch, Globe } from "lucide-react";
import { BigTextMarquee } from "@/components/ui/BigTextMarquee";

const SOCIALS = [
  { icon: X,         label: "Twitter / X", href: "#" },
  { icon: GitBranch, label: "GitHub",       href: "#" },
  { icon: Globe,     label: "LinkedIn",     href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-bg-darker border-t border-white/[0.05] overflow-hidden">
      {/* Giant marquee */}
      <div className="py-12 border-b border-white/[0.05]">
        <BigTextMarquee
          text="JUST WEBSITE"
          repeat={4}
          textClassName="text-[5rem] md:text-[9rem] text-white/[0.03]"
          reverse
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="font-display font-extrabold text-white/60 text-sm">
            JW<span className="text-accent-lavender">.</span>
          </span>
          <span className="text-white/20 text-xs font-body">© 2026 Just Website. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-2">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="p-2.5 rounded-full text-white/25 hover:text-accent-lavender hover:bg-white/5 transition-all duration-300"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
