import { StoryBlock } from "./StoryBlock";
import { StatCards } from "./StatCards";
import { BigTextMarquee } from "@/components/ui/BigTextMarquee";

export function AboutSection() {
  return (
    <section id="about" className="bg-bg-light py-0 overflow-hidden">
      {/* Marquee divider */}
      <div className="py-14 border-y border-text-muted/10">
        <BigTextMarquee
          text="OUR STORY"
          repeat={7}
          textClassName="text-[3rem] md:text-[5rem] text-text-primary/06"
          reverse
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <StoryBlock />
          <StatCards />
        </div>
      </div>
    </section>
  );
}
