"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FOCUS_RING } from "@/lib/a11y";

type MembershipChoice = "acr" | "licensee" | null;

export function MembershipTypeGuide({
  onHighlight,
}: {
  onHighlight: (choice: MembershipChoice) => void;
}) {
  const [choice, setChoice] = useState<MembershipChoice>(null);

  const select = (value: MembershipChoice) => {
    setChoice(value);
    onHighlight(value);
  };

  return (
    <div className="surface-card rounded-2xl p-5 sm:p-6 mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-2 tracking-tight">
        Which type of AFCA membership do I require?
      </h2>
      <p className="text-sm sm:text-base text-afca-gray leading-relaxed mb-5">
        Answer the question below to see which membership type you should apply for.
      </p>

      <fieldset>
        <legend className="text-sm font-semibold text-afca-navy mb-3">
          Question 1: Are you working or planning to work under another organisation&apos;s credit
          licence?
        </legend>
        <p className="text-sm text-afca-muted mb-4 leading-relaxed">
          Check with your licensee whether they require you to hold a company or individual
          membership before applying. If you require both an individual and company membership, you
          will need to submit two separate applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {(
            [
              { value: "acr" as const, label: "Yes" },
              { value: "licensee" as const, label: "No / I'm not sure" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => select(option.value)}
              className={cn(
                "rounded-xl border px-5 py-3 text-sm font-semibold transition-colors",
                FOCUS_RING,
                choice === option.value
                  ? "border-afca-blue bg-afca-cream text-afca-navy"
                  : "border-afca-navy/15 bg-white text-afca-gray hover:border-afca-blue/30"
              )}
              aria-pressed={choice === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      {choice && (
        <p className="mt-5 text-sm text-afca-blue font-medium" role="status">
          {choice === "acr"
            ? "Based on your answer, you likely need Authorised Credit Representative (ACR) membership."
            : "Based on your answer, you likely need Licensee membership."}
        </p>
      )}
    </div>
  );
}
