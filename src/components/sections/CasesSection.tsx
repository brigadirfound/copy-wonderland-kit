import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import CaseCard from "@/components/cases/CaseCard";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { cases, featuredCases } from "@/content/cases";

export default function CasesSection() {
  return (
    <section id="cases" className="container-page py-20 sm:py-28">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          index="02"
          eyebrow="Кейсы"
          title="Избранные работы"
          lead="AI-видео, креативы для брендов, сайты и онлайн-школы. Часть проектов под NDA — подробности покажу лично."
        />
        <Reveal className="shrink-0">
          <ButtonLink to="/cases" variant="secondary" size="md">
            Все кейсы · {cases.length}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredCases.map((item, i) => (
          <Reveal key={item.slug} delay={(i % 3) * 0.08} className={i === 0 ? "md:col-span-2" : undefined}>
            <CaseCard item={item} large={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
