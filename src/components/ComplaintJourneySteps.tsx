import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "./Button";
import { complaintJourneySteps } from "@/lib/complaint-journey";
import { cn } from "@/lib/utils";

export function ComplaintJourneySteps({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Complaint lodging steps" className="mb-6 sm:mb-8">
      <ol className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {complaintJourneySteps.map((item) => {
          const isComplete = item.step < currentStep;
          const isCurrent = item.step === currentStep;
          const isUpcoming = item.step > currentStep;

          const stepContent = (
            <>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  isComplete && "bg-afca-yellow text-afca-navy",
                  isCurrent && "bg-white text-afca-navy ring-2 ring-afca-yellow",
                  isUpcoming && "bg-white/15 text-white/70 ring-1 ring-white/25"
                )}
              >
                {isComplete ? <Check className="h-4 w-4" strokeWidth={2.5} /> : item.step}
              </span>
              <span className="min-w-0 text-left">
                <span
                  className={cn(
                    "block text-[11px] font-semibold uppercase tracking-[0.1em]",
                    isCurrent ? "text-afca-sky" : "text-white/50"
                  )}
                >
                  Step {item.step}
                </span>
                <span
                  className={cn(
                    "block text-sm font-semibold leading-snug mt-0.5",
                    isCurrent ? "text-white" : isComplete ? "text-white/90" : "text-white/65"
                  )}
                >
                  {item.title}
                </span>
              </span>
            </>
          );

          return (
            <li key={item.step}>
              {isUpcoming && item.external ? (
                <div
                  className="flex h-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {stepContent}
                </div>
              ) : isUpcoming ? (
                <div className="flex h-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 opacity-80">
                  {stepContent}
                </div>
              ) : item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-full items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                    isCurrent
                      ? "border-afca-yellow/50 bg-white/10"
                      : "border-white/15 bg-white/5 hover:bg-white/10"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {stepContent}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-full items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                    isCurrent
                      ? "border-afca-yellow/50 bg-white/10"
                      : "border-white/15 bg-white/5 hover:bg-white/10"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {stepContent}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function ComplaintJourneyNav({ currentStep }: { currentStep: number }) {
  const step1 = complaintJourneySteps[0];
  const step2 = complaintJourneySteps[1];
  const step3 = complaintJourneySteps[2];

  if (currentStep === 1) {
    return (
      <div className="mt-12 sm:mt-16 flex flex-col gap-4 border-t border-afca-navy/8 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-afca-gray">
          When you&apos;re ready, continue to find out what to do before lodging with AFCA.
        </p>
        <Button href={step2.href} variant="yellow" size="md" className="w-full sm:w-auto shrink-0">
          Next: {step2.title}
        </Button>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="mt-12 sm:mt-16 flex flex-col gap-4 border-t border-afca-navy/8 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={step1.href}
          className="text-sm font-semibold text-afca-blue hover:text-afca-navy transition-colors"
        >
          ← Back: {step1.title}
        </Link>
        <Button
          href={step3.href}
          variant="yellow"
          size="md"
          external
          showExternalIcon
          className="w-full sm:w-auto shrink-0"
        >
          {step3.title}
        </Button>
      </div>
    );
  }

  return null;
}
