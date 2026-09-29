import { useSearchParams } from "react-router-dom";
import CaseCard from "@/components/cases/CaseCard";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FinalCta from "@/components/sections/FinalCta";
import { cases, categoryLabels } from "@/content/cases";
import type { ServiceId } from "@/content/site";
import { usePageMeta } from "@/hooks/usePageMeta";
import { cn } from "@/lib/utils";

type Filter = "all" | ServiceId;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Все" },
  ...(Object.keys(categoryLabels) as ServiceId[]).map((id) => ({ id, label: categoryLabels[id] })),
];

const isFilter = (value: string | null): value is Filter => filters.some((f) => f.id === value);

export default function Cases() {
  usePageMeta("Кейсы", "AI-видео, креативы для брендов, сайты и онлайн-школы на GetCourse — кейсы Макса Бригадира.");

  const [params, setParams] = useSearchParams();
  const raw = params.get("type");
  const active: Filter = isFilter(raw) ? raw : "all";
  const list = active === "all" ? cases : cases.filter((item) => item.category === active);

  const countFor = (id: Filter) => (id === "all" ? cases.length : cases.filter((item) => item.category === id).length);

  const select = (id: Filter) => {
    const next = new URLSearchParams(params);
    if (id === "all") next.delete("type");
    else next.set("type", id);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <section className="container-page pb-8 pt-[calc(var(--header-h)+4rem)] sm:pt-[calc(var(--header-h)+6rem)]">
        <SectionHeading
          as="h1"
          eyebrow="Портфолио"
          title="Кейсы"
          lead="Сайты, AI-видео, креативы для брендов и онлайн-школы. Работы под NDA — без подробностей, примеры покажу лично."
        />

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-2" >
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => select(filter.id)}
              aria-pressed={active === filter.id}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-300",
                active === filter.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/25 hover:text-foreground",
              )}
            >
              {filter.label}
              <span className={cn("font-mono text-xs", active === filter.id ? "opacity-70" : "opacity-60")}>
                {countFor(filter.id)}
              </span>
            </button>
          ))}
        </Reveal>

        <div key={active} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.06}>
              <CaseCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
