import About from "@/components/sections/About";
import Brands from "@/components/sections/Brands";
import CasesSection from "@/components/sections/CasesSection";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Index() {
  usePageMeta();

  return (
    <>
      <Hero />
      <Marquee />
      <Brands />
      <Services />
      <CasesSection />
      <Process />
      <About />
      <Faq />
      <FinalCta />
    </>
  );
}
