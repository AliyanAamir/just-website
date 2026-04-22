import { HeroCanvas } from "./HeroCanvas";
import { HeroContent } from "./HeroContent";
import { BigTextMarquee } from "@/components/ui/BigTextMarquee";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-bg-dark overflow-hidden noise">
      <HeroCanvas />
      <HeroContent />

      {/* Scrolling text banner at bottom */}
      <div className="absolute bottom-0 left-0 right-0 py-5 border-t border-white/[0.06] bg-bg-darker/60 backdrop-blur-sm">
        <BigTextMarquee
          text="WE BUILD · WE DESIGN · WE SHIP"
          textClassName="text-[1.1rem] text-white/20"
          repeat={8}
        />
      </div>
    </section>
  );
}
