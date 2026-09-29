import Reveal from "@/components/motion/Reveal";
import { brandList } from "@/content/cases";

export default function Brands() {
  if (brandList.length === 0) return null;

  return (
    <section aria-labelledby="brands-title" className="container-page py-14 sm:py-16">
      <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-14">
        <p id="brands-title" className="eyebrow shrink-0 leading-relaxed lg:max-w-[13rem]">
          Креативы и мемы для брендов
          <span className="block normal-case tracking-normal text-muted-foreground/60">через рекламное агентство</span>
        </p>
        <ul className="flex flex-wrap gap-x-7 gap-y-3 sm:gap-x-9">
          {brandList.map((brand) => (
            <li
              key={brand}
              className="font-display text-base font-medium text-foreground/50 transition-colors duration-300 hover:text-foreground sm:text-xl"
            >
              {brand}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
