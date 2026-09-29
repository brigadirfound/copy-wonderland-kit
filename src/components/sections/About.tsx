import { MapPin } from "lucide-react";
import portrait from "@/assets/portrait.webp";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { about, site } from "@/content/site";

export default function About() {
  return (
    <section id="about" className="container-page py-20 sm:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:sticky lg:top-28">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-card">
            <img
              src={portrait}
              alt={`${site.name} — ${site.brand}`}
              width={640}
              height={640}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-background/60 px-3 py-1.5 text-xs backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {site.location}
              </span>
              <span className="rounded-full border border-white/15 bg-background/60 px-3 py-1.5 text-xs backdrop-blur-md">
                Работаю удалённо
              </span>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading index="04" eyebrow="Обо мне" title={about.title} />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-pretty">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {about.facts.map((fact, i) => (
              <Reveal
                as="li"
                key={fact.value}
                delay={i * 0.08}
                className="rounded-2xl border border-white/[0.08] bg-card/60 p-5"
              >
                <p className="font-display text-2xl font-semibold text-primary">{fact.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
