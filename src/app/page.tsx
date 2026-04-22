import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { WorkSection } from "@/components/sections/work";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
