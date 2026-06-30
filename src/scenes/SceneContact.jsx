import { useEffect, useRef } from "react"
import { gsap } from "../lib/gsapSetup"
import SceneStage from "../components/SceneStage"
import LazyParticleScene from "../r3f/LazyParticleScene"
import { profile } from "../data/content"

// Scene 7 — Contact. "Camera approaches a glowing terminal": the
// particle field returns in the warm ember tone (mirroring the cinematic
// color shift seen in reference research — one motif, a different mood
// at journey's end), and the contact block reads like a terminal prompt
// waiting for input.
export default function SceneContact() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <SceneStage id="contact" className="px-6 md:px-16 py-28 md:py-40 overflow-hidden">
      <div ref={rootRef} className="relative" style={{ transformStyle: "preserve-3d" }}>
        <LazyParticleScene color="#ff5a3c" count={350} speed={0.014} cameraZ={4} />

        <div className="relative z-10">
          <p className="contact-reveal font-mono text-xs tracking-[0.25em] uppercase text-(--color-ember) mb-4">
            Room 08 — Terminal
          </p>
          <h2 className="contact-reveal font-display text-4xl md:text-6xl text-(--color-paper) max-w-3xl leading-[1.05]">
            Let's connect the next route.
          </h2>
          <p className="contact-reveal mt-6 max-w-lg text-(--color-paper-dim) text-lg leading-relaxed">
            Open to Network Engineer and NOC roles — in Egypt or relocating to Saudi Arabia.
          </p>

          <div className="contact-reveal mt-12 rounded-2xl border border-(--color-line) bg-(--color-surface)/70 backdrop-blur-md p-6 md:p-8 max-w-xl font-mono text-sm">
            {/* <p className="text-(--color-paper-dim)">
              <span className="text-(--color-ember)">guest@network</span>:~$ contact --send
            </p> */}
            <a
              href={`mailto:${profile.email}`}
              className="group mt-3 inline-flex items-baseline gap-3 text-xl md:text-2xl font-display text-(--color-paper) hover:text-(--color-ember) transition-colors duration-300 w-fit not-italic"
            >
              {profile.email}
              <span className="text-(--color-ember) text-base group-hover:translate-x-1 transition-transform duration-300">↗</span>
            </a>
            <p className="mt-2 text-(--color-paper-dim)">{profile.phone}</p>
          </div>

          <div className="contact-reveal mt-10 flex flex-wrap gap-x-10 gap-y-3">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="font-mono text-sm text-(--color-paper-dim) hover:text-(--color-paper) border-b border-(--color-line) hover:border-(--color-paper) pb-1 transition-colors">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="font-mono text-sm text-(--color-paper-dim) hover:text-(--color-paper) border-b border-(--color-line) hover:border-(--color-paper) pb-1 transition-colors">
              GitHub
            </a>
          </div>

          <div className="contact-reveal mt-24 pt-8 border-t border-(--color-line) flex flex-col md:flex-row justify-between gap-3 font-mono text-xs text-(--color-paper-dim)/60">
            <span>{profile.fullName} — {new Date().getFullYear()}</span>
            {/* <span>React · R3F · GSAP · Lenis</span> */}
          </div>
        </div>
      </div>
    </SceneStage>
  )
}
