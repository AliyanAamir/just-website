import { X, GitBranch, Globe } from "lucide-react";

const SOCIALS = [
  { icon: X, label: "Twitter / X", href: "#" },
  { icon: GitBranch, label: "GitHub", href: "#" },
  { icon: Globe, label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-bg-darker border-t border-white/[0.06] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-display font-bold text-white text-sm">Just Website</span>
          <span className="text-white/30 text-sm ml-3">© 2026 All rights reserved.</span>
        </div>
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="p-2.5 rounded-full text-white/40 hover:text-accent-lavender hover:bg-white/5 transition-all duration-300"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
