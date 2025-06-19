import { useEffect, useRef } from "react"

export default function ParallaxSection() {
  const layer1 = useRef()
  const layer2 = useRef()
  const layer3 = useRef()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (layer1.current) layer1.current.style.transform = `translateY(${scrollY * 0.2}px)`
      if (layer2.current) layer2.current.style.transform = `translateY(${scrollY * 0.4}px)`
      if (layer3.current) layer3.current.style.transform = `translateY(${scrollY * 0.6}px)`
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
      <div ref={layer1} className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 to-purple-600/30 blur-2xl z-10 transition-transform duration-300" />
      <div ref={layer2} className="absolute inset-0 bg-[url('/graph.png')] bg-cover bg-center opacity-60 z-20 transition-transform duration-300" />
      <div ref={layer3} className="absolute inset-0 bg-[url('/cards.png')] bg-contain bg-no-repeat bg-bottom opacity-80 z-30 transition-transform duration-300" />
      <div className="relative z-40 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg tracking-tight">Parallax Magic</h2>
        <p className="mt-4 text-xl md:text-2xl text-white/80">Scroll to see the layers move and create depth!</p>
      </div>
    </section>
  )
} 