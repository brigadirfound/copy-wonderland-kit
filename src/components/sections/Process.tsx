import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { processSteps } from "@/content/site";

export default function Process() {
  return (
    <section id="process" className="container-page py-20 sm:py-28">
      <SectionHeading
        index="03"
        eyebrow="Как работаю"
        title="Просто и прозрачно"
        lead="Без брифов на сорок вопросов и исполнителей, которые пропадают после предоплаты."
      />

      <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            delay={i * 0.08}
            className="group relative flex flex-col rounded-3xl border border-white/[0.08] bg-card/60 p-6 transition-colors duration-300 hover:border-white/[0.16] sm:p-7"
          >
            <span className="font-display text-5xl font-semibold leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_hsl(var(--primary))] group-hover:text-primary">
              0{i + 1}
            </span>
            <h3 className="mt-10 font-display text-lg font-semibold">{step.title}</h3>
            <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
