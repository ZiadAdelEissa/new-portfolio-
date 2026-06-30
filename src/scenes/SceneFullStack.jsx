import { motion } from "framer-motion"
import SceneStage from "../components/SceneStage"
import { fullStack } from "../data/content"

// Scene 7 — Full Stack. Sits between the network career log and the
// terminal sign-off: a short, honest aside acknowledging the dev
// background the rest of the page deliberately keeps in the back seat.
// Reuses the glass-panel SceneStage treatment for visual continuity
// with About/Projects/Experience, and the same hover-tilt micro-
// interaction pattern as the Skills room's cards.
export default function SceneFullStack() {
  return (
    <SceneStage id="fullstack" className="px-6 md:px-16 py-20">
      <div style={{ transformStyle: "preserve-3d" }}>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-(--color-signal) mb-4">
          Room 07 — Full Stack
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-(--color-paper) max-w-2xl leading-tight">
          What's running underneath.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-(--color-paper-dim) leading-relaxed">
          {fullStack.intro}
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-16" style={{ transformStyle: "preserve-3d" }}>
          {fullStack.groups.map((group) => (
            <motion.div
              key={group.group}
              whileHover={{ rotateX: -4, rotateY: 4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl border border-(--color-line) bg-(--color-surface)/70 backdrop-blur-md p-8 shadow-[0_30px_80px_-40px_rgba(110,86,255,0.25)]"
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
          ))}
        </div>
      </div>
    </SceneStage>
  )
}
