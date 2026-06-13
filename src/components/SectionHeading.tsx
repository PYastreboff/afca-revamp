import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-afca-blue mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-afca-navy tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base sm:text-lg text-afca-gray leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
