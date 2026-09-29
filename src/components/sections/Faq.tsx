import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faq } from "@/content/site";

export default function Faq() {
  return (
    <section id="faq" className="container-page py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          index="05"
          eyebrow="FAQ"
          title="Частые вопросы"
          lead="Не нашли ответ — напишите, отвечу лично."
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <Reveal>
          <Accordion type="single" collapsible className="border-t border-white/10">
            {faq.map((item, i) => (
              <AccordionItem key={item.q} value={`q-${i}`} className="border-white/10">
                <AccordionTrigger className="gap-6 py-6 text-left font-display text-base font-semibold hover:no-underline sm:text-lg [&>svg]:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-10 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
