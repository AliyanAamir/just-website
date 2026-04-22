import { StoryBlock } from "./StoryBlock";
import { StatCards } from "./StatCards";
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";

export function AboutSection() {
  return (
    <section id="about" className="bg-bg-base py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <StoryBlock />
          <StatCards />
        </div>
      </div>
      <div className="mt-24">
        <MarqueeStrip />
      </div>
    </section>
  );
}
