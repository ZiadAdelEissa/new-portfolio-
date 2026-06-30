import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"

// Lightweight ambient particle field — a single THREE.Points cloud.
// This is the one piece of "real" WebGL in the page, used deliberately
// only where it earns its cost: the depth cue behind the cinematic
// scroll, evoking "flying through floating particles" without the
// overhead of per-particle meshes or physics.
export default function ParticleField({ count = 600, color = "#6e56ff", speed = 0.02 }) {
  const pointsRef = useRef(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * speed
    pointsRef.current.rotation.x += delta * speed * 0.4
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  )
}
