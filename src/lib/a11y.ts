export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afca-blue focus-visible:ring-offset-2";

export const SR_NEW_WINDOW = "(opens in new tab)";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
  );
}
