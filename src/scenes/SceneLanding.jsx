import LazyParticleScene from "../r3f/LazyParticleScene"
import ScrambleText from "../components/ScrambleText"
import { smoothScrollTo } from "../lib/scrollTo"
import { profile } from "../data/content"

// Scene 1 — Landing. The camera starts deep in a particle field; the
// name and role resolve out of scrambled characters, establishing the
// "operating system boot sequence" tone for the rest of the experience.
export default function SceneLanding() {
  return (
    <section
      id="landing"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden"
    >
      <LazyParticleScene color="#6e56ff" count={500} speed={0.018} cameraZ={4} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-(--color-ink) pointer-events-none" />

      <div className="relative z-10 max-w-5xl">
        <p className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-(--color-signal) mb-6">
          system online — cairo, eg
        </p>

        <h1 className="font-display font-medium text-[clamp(2.5rem,8vw,6rem)] leading-[0.98] tracking-tight">
          <span className="block text-(--color-paper)">
            <ScrambleText text="Ziad Adel." delay={0.3} duration={0.9} />
          </span>
          <span className="block text-(--color-paper-dim)">
            <ScrambleText text="Network Engineer," delay={0.55} duration={1.1} />
          </span>
          {/* <span className="block">
            <span className="text-(--color-signal)">
              <ScrambleText text="CCNA" delay={0.95} duration={0.6} />
            </span>{" "}
            <ScrambleText text="candidate." delay={1.05} duration={0.8} />
          </span> */}
        </h1>

        <p className="mt-8 max-w-xl text-lg text-(--color-paper-dim) leading-relaxed">
          {profile.tagline}. Scroll to move through the build — one room per system.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="#build"
            onClick={(e) => smoothScrollTo(e, "#build")}
            className="px-6 py-3 bg-(--color-signal) text-(--color-ink) font-medium rounded-full hover:bg-(--color-paper) transition-colors duration-300"
          >
            Enter the network
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-(--color-paper-dim) hover:text-(--color-paper) transition-colors border-b border-(--color-line) hover:border-(--color-paper) pb-1"
          >
            github.com/ZiadAdelEissa
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 md:left-16 font-mono text-[11px] text-(--color-paper-dim) tracking-wide">
        <span className="text-(--color-signal)">$</span> scroll --enter-the-grid
      </div>
    </section>
  )
}
