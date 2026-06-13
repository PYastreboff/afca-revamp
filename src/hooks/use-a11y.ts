"use client";

import { useEffect, useRef, type RefObject } from "react";
import { getFocusableElements } from "@/lib/a11y";

export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onEscape?: () => void
) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const root = containerRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscape?.();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(root);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, containerRef, onEscape]);
}

export function useInertBackground(active: boolean) {
  useEffect(() => {
    const main = document.getElementById("main-content");
    const footer = document.getElementById("site-footer");

    if (active) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }

    return () => {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [active]);
}

export function useRestoreFocus(active: boolean) {
  const savedFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active) {
      savedFocus.current = document.activeElement as HTMLElement | null;
      return;
    }

    savedFocus.current?.focus();
    savedFocus.current = null;
  }, [active]);
}
