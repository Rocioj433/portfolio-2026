import { useEffect } from 'react'
import type { CSSProperties } from 'react'

/**
 * Reveals every `[data-reveal]` element once, when it enters the viewport.
 *
 * The attribute is the whole contract: the CSS owns the transition and this
 * hook only flips `data-revealed`. Content is never trapped behind the
 * animation — without IntersectionObserver everything is revealed at once, and
 * under `prefers-reduced-motion` the CSS drops the travel.
 */
export function useReveal(dependency: unknown) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (!('IntersectionObserver' in window)) {
      for (const target of targets) {
        target.setAttribute('data-revealed', '')
      }
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }
          entry.target.setAttribute('data-revealed', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    for (const target of targets) {
      if (target.hasAttribute('data-revealed')) {
        continue
      }
      observer.observe(target)
    }

    return () => observer.disconnect()
  }, [dependency])
}

/** Stagger index for one revealed element; the CSS turns it into a delay. */
export function revealIndex(index: number): CSSProperties {
  return { '--reveal-i': index } as CSSProperties
}
