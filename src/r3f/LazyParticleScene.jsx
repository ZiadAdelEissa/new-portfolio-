import { lazy, Suspense } from "react"

// React.lazy + dynamic import splits Three.js/R3F into their own chunk
// so the ~350KB WebGL payload doesn't block first paint of the text
// content that actually matters for a job-application portfolio. The
// particle canvas streams in slightly after the headline is already
// readable, rather than gating the whole page on it.
const SceneCanvas = lazy(() => import("./SceneCanvas"))
const ParticleField = lazy(() => import("./ParticleField"))

const isCoarsePointer =
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches

export default function LazyParticleScene({ color, count, speed, cameraZ }) {
  // Mobile GPUs run this canvas at the same time as heavy CSS blur/3D
  // transform animations elsewhere on the page; halving particle count
  // on touch devices meaningfully reduces combined GPU load without
  // visibly thinning the effect on a small screen.
  const effectiveCount = isCoarsePointer ? Math.round(count / 2) : count

  return (
    <Suspense fallback={null}>
      <SceneCanvas cameraZ={cameraZ}>
        <ParticleField count={effectiveCount} color={color} speed={speed} />
      </SceneCanvas>
    </Suspense>
  )
}
