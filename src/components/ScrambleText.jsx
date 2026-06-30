import { useEffect, useRef } from "react"
import { gsap } from "../lib/gsapSetup"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01"

// Text that resolves from random characters into the real word —
// the page's opening signature move, inspired by reference site analysis.
// Each character locks in, left to right, while unresolved characters
// keep flickering through random glyphs until their turn arrives.
export default function ScrambleText({ text, className = "", delay = 0, duration = 1.2 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const chars = text.split("")
    const total = chars.length
    const obj = { progress: 0 }

    const tween = gsap.to(obj, {
      progress: 1,
      duration,
      delay,
      ease: "power1.inOut",
      onUpdate() {
        // How many characters (from the left) are fully locked in by now.
        const lockedCount = Math.floor(obj.progress * total)
        el.textContent = chars
          .map((ch, i) => {
            if (ch === " ") return " "
            if (i < lockedCount) return ch
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      },
      onComplete() {
        el.textContent = text
      },
    })

    return () => tween.kill()
  }, [text, delay, duration])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  )
}
