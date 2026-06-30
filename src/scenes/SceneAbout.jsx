import SceneStage from "../components/SceneStage"
import NetworkTrace from "../components/NetworkTrace"
import { profile } from "../data/content"

// Scene 2 — About. The camera settles into a single floating glass
// panel: a quiet, architectural "room" after the particle flythrough.
export default function SceneAbout() {
  return (
    <SceneStage id="about" className="px-6 md:px-16 py-20">
      <div
        className="relative rounded-3xl border border-(--color-line) bg-(--color-surface)/60 backdrop-blur-xl px-8 md:px-14 py-14 md:py-20 shadow-[0_40px_120px_-40px_rgba(110,86,255,0.35)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-3xl opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 0%, rgba(110,86,255,0.18), transparent 60%)",
          }}
        />

        <div className="relative grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-(--color-signal) mb-4">Room 02 — About</p>
            <h2 className="font-display text-3xl md:text-4xl text-(--color-paper) leading-tight">
              Built for the path between two points.
            </h2>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <p className="text-xl md:text-2xl text-(--color-paper-dim) leading-relaxed font-light">
              {profile.summary}
            </p>

            <div className="mt-12">
              <NetworkTrace className="w-full max-w-md h-24" nodeCount={4} />
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 font-mono text-sm text-(--color-paper-dim)">
              <span>{profile.location}</span>
              <span className="text-(--color-line)">/</span>
              <span>CCNA — Fullstack</span>
              <span className="text-(--color-line)">/</span>
              <span>Open to relocation</span>
            </div>
          </div>
        </div>
      </div>
    </SceneStage>
  )
}
