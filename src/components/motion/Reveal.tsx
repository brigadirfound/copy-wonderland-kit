import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li";
}

/** Плавное появление блока при прокрутке. */
export default function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = as === "li" ? m.li : m.div;

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </Component>
  );
}
