import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "../lib/gsapSetup"
import { skills } from "../data/content"

// Scene 4 — Skills. "Cards assemble from different depths": each
// group starts scattered at a distinct z/rotation offset and converges
// into the grid as the scene scrubs into focus, then holds before the
// next room takes over.
//
// Two animation systems share this scene by design, each owning a
// separate transform layer so they never fight over the same property:
// GSAP drives the outer wrapper's scroll-scrubbed depth entrance, while
// Framer Motion drives the inner card's hover tilt (a "glass reflection"
// micro-interaction Framer's spring physics suit better than a manual
// scroll timeline).
const DEPTH_OFFSETS = [
  { z: -340, rx: 26, ry: -18, x: -60 },
  { z: -460, rx: -22, ry: 20, x: 40 },
  { z: -300, rx: 18, ry: 24, x: -30 },
  { z: -420, rx: -26, ry: -16, x: 50 },
]

export default function SceneSkills() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || cards.length === 0) return

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (!card) return
        const offset = DEPTH_OFFSETS[i % DEPTH_OFFSETS.length]

        gsap.set(card, {
          z: offset.z,
          x: offset.x,
          rotationX: offset.rx,
          rotationY: offset.ry,
          opacity: 0.15,
          filter: "blur(10px)",
        })

        gsap.to(card, {
          z: 0,
          x: 0,
          rotationX: 0,
          rotationY: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 15%",
            scrub: 0.8,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative px-6 md:px-16 py-28 md:py-36"
      style={{ perspective: "1600px" }}
    >
      <p className="font-mono text-xs tracking-[0.25em] uppercase text-(--color-signal) mb-4">Room 04 — Skills</p>
      <h2 className="font-display text-3xl md:text-4xl text-(--color-paper) mb-16 max-w-2xl">
        Four panels, converging.
      </h2>

      <div className="grid md:grid-cols-4 gap-6" style={{ transformStyle: "preserve-3d" }}>
        {skills.map((group, i) => (
          <div
            key={group.group}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              whileHover={{ rotateX: -4, rotateY: 4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl border border-(--color-line) bg-(--color-surface)/70 backdrop-blur-md p-8 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.25)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-(--color-trace) mb-6">
                {group.group}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-(--color-paper-dim) text-sm leading-relaxed border-l border-(--color-line) pl-3 hover:border-(--color-signal) hover:text-(--color-paper) transition-colors duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
