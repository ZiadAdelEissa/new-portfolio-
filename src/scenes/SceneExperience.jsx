import { useEffect, useRef } from "react"
import { gsap } from "../lib/gsapSetup"
import SceneStage from "../components/SceneStage"
import { experience } from "../data/content"

// Scene 6 — Experience. "Camera enters a holographic network": each
// job becomes a node along a single glowing trunk line, the way a
// network diagram would render a chain of connected systems — the
// page's recurring visual language applied to a career timeline.
export default function SceneExperience() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trunk = rootRef.current.querySelector(".exp-trunk")
      if (trunk) {
        gsap.fromTo(
          trunk,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: { trigger: rootRef.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
          }
        )
      }

      gsap.utils.toArray(".exp-node").forEach((node, i) => {
        gsap.fromTo(
          node,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40, z: -180 },
          {
            opacity: 1,
            x: 0,
            z: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 85%" },
          }
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <SceneStage id="experience" className="px-6 md:px-16 py-20">
      <div ref={rootRef} style={{ transformStyle: "preserve-3d" }}>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-(--color-signal) mb-4">Room 06 — Network Log</p>
        <h2 className="font-display text-3xl md:text-4xl text-(--color-paper) mb-20 max-w-2xl">
          Every node before this one.
        </h2>

        <div className="relative pl-8 md:pl-12">
          <div className="exp-trunk absolute left-0 md:left-1 top-0 bottom-0 w-px bg-gradient-to-b from-(--color-signal) via-(--color-trace) to-transparent" />

          <div className="space-y-12">
            {experience.map((job) => {
              const Wrapper = job.link ? "a" : "div"
              const wrapperProps = job.link
                ? { href: job.link, target: "_blank", rel: "noreferrer" }
                : {}
              return (
                <Wrapper
                  key={job.org}
                  {...wrapperProps}
                  className="exp-node group relative block rounded-2xl border border-(--color-line) bg-(--color-surface)/60 backdrop-blur-md p-6 md:p-7 hover:border-(--color-signal)/50 transition-colors duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span className="absolute -left-[39px] md:-left-[47px] top-7 w-3 h-3 rounded-full bg-(--color-signal) shadow-[0_0_12px_2px_rgba(110,86,255,0.6)]" />

                  <div className="grid md:grid-cols-12 gap-3 md:gap-4 items-baseline">
                    <span className="md:col-span-3 font-mono text-xs text-(--color-paper-dim)">{job.period}</span>
                    <span className="md:col-span-4 font-display text-lg text-(--color-paper) group-hover:text-(--color-signal) transition-colors duration-300 flex items-center gap-2">
                      {job.role}
                      {job.link && (
                        <span className="text-(--color-signal) text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          ↗
                        </span>
                      )}
                    </span>
                    <span className="md:col-span-2 text-sm text-(--color-paper-dim)">{job.org}</span>
                    <span className="md:col-span-3 text-sm text-(--color-paper-dim)/70">{job.note}</span>
                  </div>
                </Wrapper>
              )
            })}
          </div>
        </div>
      </div>
    </SceneStage>
  )
}
