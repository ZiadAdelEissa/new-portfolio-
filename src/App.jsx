import { useEffect } from "react"
import { initLenis, destroyLenis, ScrollTrigger } from "./lib/gsapSetup"
import Nav from "./components/Nav"
import NetworkBuild from "./components/NetworkBuild"
import SceneLanding from "./scenes/SceneLanding"
import SceneAbout from "./scenes/SceneAbout"
import SceneSkills from "./scenes/SceneSkills"
import SceneProjects from "./scenes/SceneProjects"
import SceneExperience from "./scenes/SceneExperience"
import SceneFullStack from "./scenes/SceneFullStack"
import SceneContact from "./scenes/SceneContact"

export default function App() {
  useEffect(() => {
    initLenis()

    // Web fonts and images can change layout height after first paint,
    // which makes ScrollTrigger's cached trigger positions stale (the
    // most common cause of "scroll animations don't fire" bugs).
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    const t = setTimeout(refresh, 600)
    if (document.fonts?.ready) document.fonts.ready.then(refresh)

    return () => {
      window.removeEventListener("load", refresh)
      clearTimeout(t)
      destroyLenis()
    }
  }, [])

  return (
    <div className="relative">
      <Nav />
      <main>
        <SceneLanding />
        <SceneAbout />
        <NetworkBuild />
        <SceneSkills />
        <SceneProjects />
        <SceneExperience />
        <SceneFullStack />
        <SceneContact />
      </main>
    </div>
  )
}
