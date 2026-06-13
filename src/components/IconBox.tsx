import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const accentMap = {
  yellow: "from-afca-yellow/20 to-afca-yellow/5 text-afca-navy ring-afca-yellow/30",
  orange: "from-afca-orange/20 to-afca-orange/5 text-afca-navy ring-afca-orange/30",
  sky: "from-afca-sky/25 to-afca-sky/5 text-afca-blue ring-afca-sky/30",
  navy: "from-afca-navy/10 to-afca-blue/5 text-afca-blue ring-afca-navy/15",
  teal: "from-afca-teal/30 to-afca-sky/10 text-afca-blue ring-afca-teal/40",
} as const;

type Accent = keyof typeof accentMap;

export function IconBox({
  icon: Icon,
  accent = "navy",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  accent?: Accent;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-10 w-10 [&_svg]:h-4 [&_svg]:w-4",
    md: "h-12 w-12 [&_svg]:h-5 [&_svg]:w-5",
    lg: "h-14 w-14 [&_svg]:h-6 [&_svg]:w-6",
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-inset transition-transform duration-300 group-hover:scale-105",
        sizes[size],
        accentMap[accent],
        className
      )}
    >
      <Icon strokeWidth={1.75} />
    </div>
  );
}
