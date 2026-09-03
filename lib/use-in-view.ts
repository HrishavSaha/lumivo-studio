"use client";

import { useEffect, useRef, useState } from "react";

/** Reveal anyway if the observer has said nothing by now. */
const SAFETY_TIMEOUT_MS = 1200;

/**
 * Fires once when the element scrolls into view. Powers <Reveal>.
 *
 * Because the reveal starts at opacity 0, a missing callback would leave
 * content permanently invisible — and IntersectionObserver genuinely does go
 * silent when the browser suspends a window's rendering lifecycle (occluded or
 * background windows, heavily throttled tabs). So the observer is paired with a
 * timeout: the animation is an enhancement, never a precondition for seeing the
 * page. The no-JavaScript case is covered by `@media (scripting: none)` in
 * globals.css.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let settled = false;

    // `observer` and `timer` are both initialised below; reveal only ever runs
    // asynchronously, so neither reference is hit before assignment.
    const reveal = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      observer.disconnect();
      setInView(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    const timer = setTimeout(reveal, SAFETY_TIMEOUT_MS);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, inView };
}
