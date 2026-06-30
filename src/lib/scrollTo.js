import { getLenis } from "./gsapSetup"

// Shared helper so every internal anchor (nav links, hero CTA, etc.)
// scrolls through Lenis rather than the browser's native instant jump,
// which would otherwise visibly fight Lenis's smoothing on every click.
export function smoothScrollTo(e, href) {
  e.preventDefault()
  const target = document.querySelector(href)
  if (!target) return
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 3) })
  } else {
    target.scrollIntoView({ behavior: "smooth" })
  }
}
