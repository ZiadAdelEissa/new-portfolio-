import { Canvas } from "@react-three/fiber"

// Shared Canvas wrapper with performance-conscious defaults: capped DPR,
// no shadow maps, low-power preference, and a fixed low-FOV camera so
// every scene that uses WebGL shares the same cheap baseline rather than
// each one re-deciding render settings.
//
// onCreated wires up WebGL context-loss recovery: mobile GPUs can drop
// the context under sustained load (e.g. this canvas running underneath
// heavy CSS blur+3D-transform animations during scroll). Without an
// explicit listener, a lost context silently stops rendering and can
// cascade into a blank/white page that only a manual reload clears.
// preventDefault() on the loss event tells the browser we'll handle
// it, and the restore listener lets the canvas pick back up instead of
// staying dead.
function handleContextEvents(gl) {
  const canvas = gl.domElement
  const onLost = (e) => {
    e.preventDefault()
    console.warn("WebGL context lost — will attempt to restore.")
  }
  const onRestored = () => {
    console.info("WebGL context restored.")
  }
  canvas.addEventListener("webglcontextlost", onLost, false)
  canvas.addEventListener("webglcontextrestored", onRestored, false)
}

const isCoarsePointer =
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches

export default function SceneCanvas({ children, cameraZ = 5 }) {
  return (
    <Canvas
      dpr={isCoarsePointer ? [1, 1] : [1, 1.5]}
      gl={{ antialias: !isCoarsePointer, alpha: true, powerPreference: "low-power", failIfMajorPerformanceCaveat: false }}
      camera={{ position: [0, 0, cameraZ], fov: 50, near: 0.1, far: 100 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      onCreated={({ gl }) => handleContextEvents(gl)}
    >
      <ambientLight intensity={0.6} />
      {children}
    </Canvas>
  )
}
