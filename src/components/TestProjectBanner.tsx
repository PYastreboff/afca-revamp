import { FOCUS_RING } from "@/lib/a11y";
import { cn } from "@/lib/utils";

export function TestProjectBanner() {
  return (
    <div
      role="note"
      aria-label="Test project notice"
      className="bg-afca-navy text-white border-b border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 text-center text-xs sm:text-sm text-afca-on-navy-muted leading-relaxed">
        <strong className="font-semibold text-white">Test project.</strong> This is an unofficial
        demo redesign and is not affiliated with AFCA. Official site:{" "}
        <a
          href="https://www.afca.org.au/"
          className={cn(
            "font-semibold text-afca-teal hover:text-white underline-offset-2 hover:underline rounded-sm",
            FOCUS_RING
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          afca.org.au
        </a>
      </div>
    </div>
  );
}
