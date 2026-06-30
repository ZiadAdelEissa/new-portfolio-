import { useEffect, useRef } from "react"
import { gsap } from "../lib/gsapSetup"

// SceneStage is the architectural core of the 3D scroll experience.
// Each section is a "glass panel" floating in 3D space. As the viewer
// scrolls, the incoming panel flies toward the camera (rotateX 70->0,
// translateZ -800->0, scale 0.85->1, blur 20->0) while the outgoing
// panel recedes and tilts away (rotateX -40, translateZ -500, scale 0.9,
// opacity 0.4) — like passing through a sequence of architectural rooms
// rather than scrolling a flat document.
export default function SceneStage({
  id,
  children,
  className = "",
  depthColor = "var(--color-signal)",
}) {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    if (!section || !panel) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Mobile GPUs frequently choke on filter: blur() stacked with live
    // 3D transforms (rotationX/Y + scale) scrubbed continuously during
    // scroll — this combination is a known cause of WebGL/compositor
    // context loss on weaker phone GPUs, which is what produced the
    // white-screen-needs-reload symptom. Coarse-pointer devices get a
    // much lighter blur (still felt, far cheaper to composite) instead
    // of disabling the effect outright.
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    const maxBlur = isTouch ? 6 : 20
    const exitBlur = isTouch ? 2 : 6
    // rotationY tilts the panel around its vertical axis, which makes
    // its rendered (projected) bounding box genuinely wider than the
    // viewport — this is the real source of the horizontal scroll bug
    // on phones, not just a clipping gap. Reducing the angle on touch
    // devices keeps the cinematic tilt readable while keeping the
    // panel's footprint inside 100vw.
    const entryRotationY = isTouch ? 8 : 22

    if (reducedMotion) {
      // Skip the cinematic 3D choreography entirely — a simple opacity
      // fade respects the user's stated preference without removing the
      // section reveal altogether.
      gsap.set(panel, { opacity: 0 })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 85%", end: "top 50%", scrub: 0.4 },
      })
      tl.to(panel, { opacity: 1, ease: "none" })
      return () => tl.scrollTrigger?.kill()
    }

    gsap.set(panel, {
      rotationX: 70,
      rotationY: entryRotationY,
      z: -800,
      scale: 0.85,
      opacity: 0,
      filter: `blur(${maxBlur}px)`,
      transformOrigin: "50% 50%",
      willChange: "transform, filter, opacity",
    })

    const ctx = gsap.context(() => {
      // Incoming: panel flies from deep space into focus.
      const tlIn = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          end: "top 25%",
          scrub: 0.8,
        },
      })
      tlIn.to(panel, {
        rotationX: 0,
        rotationY: 0,
        z: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        ease: "none",
      })

      // Outgoing: panel recedes and tilts away as the next one approaches.
      const tlOut = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "bottom 75%",
          end: "bottom 5%",
          scrub: 0.8,
        },
      })
      tlOut.to(panel, {
        rotationX: -40,
        z: -500,
        scale: 0.9,
        opacity: 0.4,
        filter: `blur(${exitBlur}px)`,
        ease: "none",
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      data-depth-color={depthColor}
      className={`relative min-h-screen flex items-center overflow-x-hidden ${className}`}
      style={{ perspective: "1400px" }}
    >
      <div
        ref={panelRef}
        className="relative w-full"
        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      >
        {children}
      </div>
    </section>
  )
}
