import { useEffect, useRef } from "react"
import { gsap } from "../lib/gsapSetup"

// Subtle mouse-driven perspective shift — the "micro interaction" that
// makes the 3D space feel inhabited rather than just animated on rails.
// Returns a ref to attach to the element whose perspective should react
// to pointer position (typically a top-level stage wrapper).
export function usePointerParallax(strength = 10) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return // skip on touch

    const quickX = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power2.out" })
    const quickY = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power2.out" })

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      quickX(nx * strength)
      quickY(-ny * strength)
    }

    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [strength])

  return ref
}
