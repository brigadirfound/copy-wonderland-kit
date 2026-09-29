import { ArrowUpRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import CaseCover from "@/components/cases/CaseCover";
import { categoryLabels, type CaseStudy } from "@/content/cases";
import { cn } from "@/lib/utils";

export function CaseBadges({ item, className }: { item: CaseStudy; className?: string }) {
  const chip = "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md";

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <span className={cn(chip, "border-white/10 bg-background/70 text-foreground/90")}>{categoryLabels[item.category]}</span>
      {item.status === "nda" && (
        <span className={cn(chip, "border-primary/30 bg-background/70 text-primary")}>
          <Lock className="h-3 w-3" />
          NDA
        </span>
      )}
      {item.status === "wip" && (
        <span className={cn(chip, "border-amber-400/30 bg-background/70 text-amber-300")}>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
          В работе
        </span>
      )}
    </div>
  );
}

interface CaseCardProps {
  item: CaseStudy;
  large?: boolean;
}

export default function CaseCard({ item, large = false }: CaseCardProps) {
  return (
    <Link
      to={`/cases/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-card/60 transition-colors duration-300 hover:border-white/20"
    >
      <div className={cn("relative overflow-hidden", large ? "aspect-[16/10] md:aspect-[16/8]" : "aspect-[16/10]")}>
        <CaseCover item={item} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        <CaseBadges item={item} className="absolute left-4 top-4" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className={cn("text-balance font-display font-semibold leading-snug", large ? "text-xl sm:text-2xl" : "text-lg")}>
          {item.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <ul className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, large ? 3 : 2).map((tag) => (
              <li key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>
    </Link>
  );
}
