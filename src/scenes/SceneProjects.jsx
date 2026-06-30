import { useEffect, useRef } from "react"
import { gsap } from "../lib/gsapSetup"
import SceneStage from "../components/SceneStage"
import { project } from "../data/content"

// Scene 5 — Projects. "Camera dives into a digital archive": the
// build log entries stack with depth (each one slightly further back
// than the last) and resolve into alignment as you scroll past them,
// like flipping through case files suspended in a server room.
export default function SceneProjects() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".proj-stat").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20, z: -120 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.06,
            scrollTrigger: { trigger: ".proj-stats", start: "top 85%" },
          }
        )
      })

      gsap.utils.toArray(".proj-step").forEach((el, i) => {
        const line = el.querySelector(".proj-step-line")
        gsap.fromTo(
          el,
          { opacity: 0, x: -16, z: -90 * (i % 3) },
          {
            opacity: 1,
            x: 0,
            z: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        )
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.6,
              ease: "power2.out",
              transformOrigin: "top",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          )
        }
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <SceneStage id="project" className="px-6 md:px-16 py-20">
      <div ref={rootRef} style={{ transformStyle: "preserve-3d" }}>
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-(--color-signal) mb-4">Room 05 — Archive</p>
          <h2 className="font-display text-3xl md:text-5xl text-(--color-paper) leading-tight">
            {project.title}
          </h2>
          <p className="mt-3 font-mono text-sm text-(--color-paper-dim)">{project.subtitle}</p>
          <p className="mt-6 text-lg text-(--color-paper-dim) leading-relaxed">{project.description}</p>
        </div>

        <div
          className="proj-stats grid grid-cols-2 md:grid-cols-4 gap-px bg-(--color-line) mt-16 rounded-xl overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {project.highlights.map((stat) => (
            <div key={stat.label} className="proj-stat bg-(--color-surface) p-6 md:p-8">
              <div className="font-display text-3xl md:text-4xl text-(--color-signal)">{stat.value}</div>
              <div className="mt-2 font-mono text-xs uppercase tracking-wide text-(--color-paper-dim)">{stat.label}</div>
              <div className="mt-1 text-xs text-(--color-paper-dim)/70">{stat.detail}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-12 gap-10" style={{ transformStyle: "preserve-3d" }}>
          <div className="md:col-span-4">
            <h3 className="font-display text-xl text-(--color-paper)">How it was built</h3>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-10">
            {project.details.map((d, i) => (
              <div key={d.step} className="proj-step relative pl-8">
                <div className="proj-step-line absolute left-0 top-1 bottom-0 w-px bg-(--color-signal)" />
                <span className="absolute -left-[3px] top-0 w-[7px] h-[7px] rounded-full bg-(--color-signal)" />
                <p className="font-mono text-xs uppercase tracking-wide text-(--color-trace) mb-2">
                  {String(i + 1).padStart(2, "0")} — {d.step}
                </p>
                <p className="text-(--color-paper-dim) leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-3">
          {project.stack.map((s) => (
            <span key={s} className="font-mono text-xs px-3 py-1.5 rounded-full border border-(--color-line) text-(--color-paper-dim)">
              {s}
            </span>
          ))}
        </div>

        <a
          href={project.git}
          target="_blank"
          rel="noreferrer"
          className="mt-14 inline-flex items-center gap-2 text-(--color-paper) font-medium border-b border-(--color-signal) pb-1 hover:gap-4 transition-all duration-300"
        >
          View full config & topology on GitHub
          <span className="text-(--color-signal)">→</span>
        </a>
      </div>
    </SceneStage>
  )
}
