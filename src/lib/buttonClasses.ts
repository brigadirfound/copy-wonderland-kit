import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

const base =
  "group inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,color,border-color,box-shadow] duration-300 active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:shadow-[0_0_48px_-8px_hsl(var(--primary)/0.7)]",
  secondary:
    "border border-white/15 bg-white/[0.04] text-foreground backdrop-blur-md hover:border-white/30 hover:bg-white/[0.08]",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

export const buttonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "lg", className?: string) =>
  cn(base, variants[variant], sizes[size], className);
