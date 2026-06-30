import { useEffect, useRef } from "react"
import { gsap } from "../lib/gsapSetup"

// Signature motif: a packet's route between nodes, drawing itself on scroll.
// Reused across sections as the page's recurring visual identity — the
// accent color shifts per section (mirroring the "one shape, many moods"
// pattern from reference research), tying the whole page together as
// one continuous visual thread rather than six disconnected sections.
export default function NetworkTrace({
  className = "",
  nodeCount = 4,
  animate = true,
  color = "var(--color-signal)",
}) {
  const pathRef = useRef(null)
  const dotRef = useRef(null)
  const containerRef = useRef(null)

  const width = 600
  const height = 160
  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const x = (width / (nodeCount - 1)) * i
    const y = i % 2 === 0 ? height * 0.3 : height * 0.7
    return { x, y }
  })

  const pathD = nodes
    .map((n, i) => (i === 0 ? `M ${n.x} ${n.y}` : `L ${n.x} ${n.y}`))
    .join(" ")

  useEffect(() => {
    if (!animate) return
    const path = pathRef.current
    const dot = dotRef.current
    if (!path) return

    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    if (dot) gsap.set(dot, { x: nodes[0].x, y: nodes[0].y })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate() {
        if (!dot) return
        const p = path.getPointAtLength(this.progress() * length)
        gsap.set(dot, { x: p.x, y: p.y })
      },
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [animate])

  return (
    <div ref={containerRef} className={className}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <path d={pathD} fill="none" stroke="var(--color-line)" strokeWidth="1" />
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          style={{ transition: "stroke 0.6s ease" }}
        />
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === 0 || i === nodes.length - 1 ? 5 : 3.5}
            fill={i === 0 || i === nodes.length - 1 ? color : "var(--color-trace)"}
            style={{ transition: "fill 0.6s ease" }}
          />
        ))}
        <circle ref={dotRef} r="4" fill="var(--color-paper)" opacity="0.9" />
      </svg>
    </div>
  )
}
