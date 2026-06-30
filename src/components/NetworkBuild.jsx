import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "../lib/gsapSetup"

// Scroll-scrubbed network build sequence — the page's signature moment.
// As the user scrolls through this section, the topology assembles
// itself stage by stage, mirroring how the actual lab was built:
// Router -> Core Switch -> Access layer -> Hosts -> VLAN coloring -> live pulse.
export default function NetworkBuild() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const root = svgRef.current
    const section = sectionRef.current
    if (!root) return

    const q = (sel) => root.querySelectorAll(sel)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          pin: ".build-pin",
          pinSpacing: true,
        },
      })

      // Stage 0 -> 1: Router node fades/scales in
      tl.set(q(".n-router"), { opacity: 0, scale: 0.4, transformOrigin: "center" })
      tl.set(q(".n-core, .l-router-core"), { opacity: 0 })
      tl.set(q(".n-access, .l-core-access"), { opacity: 0 })
      tl.set(q(".n-host, .l-access-host"), { opacity: 0 })
      tl.set(q(".vlan-tag"), { opacity: 0, y: 6 })
      tl.set(q(".pulse-ring"), { opacity: 0, scale: 1 })

      tl.to(q(".n-router"), { opacity: 1, scale: 1, duration: 1, ease: "back.out(2)" })

      // Stage 1 -> 2: Core switch + connecting line
      tl.to(q(".l-router-core"), { opacity: 1, duration: 0.4 }, "+=0.1")
      tl.to(q(".n-core"), { opacity: 1, duration: 0.6, ease: "back.out(2)" }, "<")

      // Stage 2 -> 3: Access switches fan out
      tl.to(q(".l-core-access"), { opacity: 1, duration: 0.4, stagger: 0.08 }, "+=0.1")
      tl.to(q(".n-access"), { opacity: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, "<")

      // Stage 3 -> 4: Hosts appear under each access switch
      tl.to(q(".l-access-host"), { opacity: 1, duration: 0.3, stagger: 0.04 }, "+=0.1")
      tl.to(q(".n-host"), { opacity: 1, duration: 0.4, stagger: 0.04, ease: "back.out(1.7)" }, "<")

      // Stage 4 -> 5: VLAN labels settle in
      tl.to(q(".vlan-tag"), { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "+=0.1")

      // Stage 5 -> 6: the whole topology goes "live" — pulse from router outward
      tl.to(q(".pulse-ring"), { opacity: 0.9, duration: 0.2 }, "+=0.1")
      tl.to(
        q(".pulse-ring"),
        { scale: 2.6, opacity: 0, duration: 1.1, ease: "power1.out", stagger: 0.15 },
        "<"
      )
    }, section)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="build" className="relative h-[420vh] bg-(--color-ink)">
      <div className="build-pin sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute top-24 left-6 md:left-16 right-6 md:right-16 flex items-start justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-(--color-signal) mb-3">
              How the lab comes together
            </p>
            <h2 className="font-display text-2xl md:text-4xl text-(--color-paper) max-w-md leading-tight">
              Scroll to watch the topology assemble.
            </h2>
          </div>
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 800 520"
          className="w-full max-w-3xl mt-16"
        >
          {/* Router -> Core */}
          <line className="l-router-core" x1="400" y1="90" x2="400" y2="190" stroke="var(--color-signal)" strokeWidth="2" />

          {/* Core -> Access (3 branches) */}
          <line className="l-core-access" x1="400" y1="220" x2="160" y2="320" stroke="var(--color-trace)" strokeWidth="1.5" />
          <line className="l-core-access" x1="400" y1="220" x2="400" y2="320" stroke="var(--color-trace)" strokeWidth="1.5" />
          <line className="l-core-access" x1="400" y1="220" x2="640" y2="320" stroke="var(--color-trace)" strokeWidth="1.5" />

          {/* Access -> Hosts (3 per branch) */}
          {[160, 400, 640].map((bx) =>
            [-60, 0, 60].map((dx) => (
              <line
                key={`${bx}-${dx}`}
                className="l-access-host"
                x1={bx}
                y1="345"
                x2={bx + dx}
                y2="430"
                stroke="var(--color-line)"
                strokeWidth="1.2"
              />
            ))
          )}

          {/* Router node */}
          <g className="n-router">
            <circle cx="400" cy="70" r="22" fill="var(--color-surface-raised)" stroke="var(--color-signal)" strokeWidth="2" />
            <rect x="389" y="59" width="22" height="22" rx="3" fill="var(--color-signal)" />
          </g>

          {/* Core switch node */}
          <g className="n-core">
            <circle cx="400" cy="205" r="20" fill="var(--color-surface-raised)" stroke="var(--color-trace)" strokeWidth="2" />
            <rect x="390" y="197" width="20" height="16" rx="2" fill="var(--color-trace)" />
          </g>

          {/* Access switches */}
          {[160, 400, 640].map((bx) => (
            <g key={bx} className="n-access">
              <circle cx={bx} cy="335" r="16" fill="var(--color-surface-raised)" stroke="var(--color-paper-dim)" strokeWidth="1.5" />
              <rect x={bx - 8} y="328" width="16" height="13" rx="2" fill="var(--color-paper-dim)" />
            </g>
          ))}

          {/* Hosts */}
          {[160, 400, 640].map((bx) =>
            [-60, 0, 60].map((dx) => (
              <circle
                key={`${bx}-host-${dx}`}
                className="n-host"
                cx={bx + dx}
                cy="440"
                r="7"
                fill="var(--color-ink)"
                stroke="var(--color-paper-dim)"
                strokeWidth="1.5"
              />
            ))
          )}

          {/* VLAN labels */}
          <text className="vlan-tag" x="160" y="475" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-signal)">VLAN 10 — HR</text>
          <text className="vlan-tag" x="400" y="475" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-trace)">VLAN 20 — IT</text>
          <text className="vlan-tag" x="640" y="475" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-paper-dim)">VLAN 30 — MGMT</text>

          {/* Pulse rings emitted from the router once the network is "live" */}
          <circle className="pulse-ring" cx="400" cy="70" r="22" fill="none" stroke="var(--color-signal)" strokeWidth="1.5" />
          <circle className="pulse-ring" cx="400" cy="205" r="20" fill="none" stroke="var(--color-trace)" strokeWidth="1.5" />
        </svg>

        <p className="absolute bottom-10 font-mono text-[11px] text-(--color-paper-dim)/70 tracking-wide">
          Router-on-a-Stick · 802.1Q Trunking · OSPF
        </p>
      </div>
    </section>
  )
}
