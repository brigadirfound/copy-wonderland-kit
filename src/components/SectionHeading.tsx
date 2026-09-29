import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
  as?: "h1" | "h2";
}

export default function SectionHeading({ index, eyebrow, title, lead, className, as = "h2" }: SectionHeadingProps) {
  const Title = as;
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          {index && <span className="text-primary">({index})</span>}
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <Title className={cn("mt-4 text-balance", as === "h1" ? "display-xl" : "display-lg")}>{title}</Title>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
