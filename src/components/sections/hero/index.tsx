import { HeroCanvas } from "./HeroCanvas";
import { HeroContent } from "./HeroContent";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-bg-base overflow-hidden">
      <HeroCanvas />
      <HeroContent />
    </section>
  );
}
