import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

// Single Lenis instance shared across the app, synced onto GSAP's own
// ticker. This is the canonical integration pattern: Lenis drives the
// native scroll position, ScrollTrigger.update() is called on every
// Lenis scroll tick (not its own rAF loop), and lagSmoothing is disabled
// so GSAP never tries to "catch up" out of step with Lenis's physics.
export function initLenis() {
  if (lenisInstance) return lenisInstance

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  lenisInstance = new Lenis({
    duration: reducedMotion ? 0.1 : 1.1,
    easing: reducedMotion
      ? (t) => t
      : (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !reducedMotion,
  })

  lenisInstance.on("scroll", ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}

export { gsap, ScrollTrigger }
