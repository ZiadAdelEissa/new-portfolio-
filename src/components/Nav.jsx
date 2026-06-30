import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { gsap } from "../lib/gsapSetup"
import { smoothScrollTo } from "../lib/scrollTo"

const links = [
  { href: "#about", label: "About" },
  { href: "#build", label: "Build" },
  { href: "#skills", label: "Skills" },
  { href: "#project", label: "Project" },
  { href: "#experience", label: "Work" },
  { href: "#fullstack", label: "Stack" },
  { href: "#contact", label: "Contact" },
]

export default function Nav() {
  const barRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    })
  }, [])

  const goTo = (e, href) => {
    smoothScrollTo(e, href)
    setOpen(false)
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-px bg-(--color-line)">
        <div ref={barRef} className="h-full bg-(--color-signal) origin-left scale-x-0" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-16 py-5 backdrop-blur-md bg-(--color-ink)/70 max-w-[100vw] box-border">
        <a href="#landing" onClick={(e) => goTo(e, "#landing")} className="font-mono text-sm text-(--color-paper) tracking-wide shrink-0">
          ZA<span className="text-(--color-signal)">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => goTo(e, l.href)}
              className="font-mono text-xs uppercase tracking-wide text-(--color-paper-dim) hover:text-(--color-paper) transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative z-50 flex flex-col items-center justify-center gap-1.5 w-10 h-10 shrink-0 rounded-full border border-(--color-line) bg-(--color-surface)"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block h-[1.5px] w-4 bg-(--color-paper) transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] w-4 bg-(--color-paper) transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-4 bg-(--color-paper) transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-(--color-ink) flex flex-col items-center justify-center gap-8"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-3xl text-(--color-paper) hover:text-(--color-signal) transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
