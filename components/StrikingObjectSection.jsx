import { useEffect, useRef, useState } from "react"

export default function StrikingObjectSection() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const sectionRef = useRef()

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const percentX = ((e.clientX - rect.left) / rect.width - 0.5) * 2 // -1 to 1
        const percentY = ((e.clientY - rect.top) / rect.height - 0.5) * 2 // -1 to 1
        setRotation({
          x: percentY * 45, // up/down tilt
          y: percentX * 90, // left/right spin
        })
      }
    }
    if (sectionRef.current) {
      sectionRef.current.addEventListener("mousemove", handleMouseMove)
    }
    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-h-[40vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-sky-100 dark:from-navy-950 dark:to-blue-950 cursor-crosshair">
      <div className="relative h-64 w-full flex items-end justify-center">
        <div className="absolute bottom-0 w-32 h-4 bg-gradient-to-r from-blue-300 to-amber-200 dark:from-cyan-700 dark:to-amber-400 rounded-full blur-md opacity-60 animate-pulse" />
        <div className="absolute bottom-8 left-1/2" style={{ transform: "translateX(-50%)" }}>
          <div
            className="striking-ball-3d"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
          >
            {/* 3D shine and shadow */}
            <div className="shine" />
            <div className="shadow" />
          </div>
        </div>
      </div>
      <h2 className="mt-12 text-4xl font-extrabold text-blue-700 dark:text-cyan-300">3D Striking Object</h2>
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-200">Move your cursor to rotate the 3D ball in 360°!</p>
    </section>
  )
}
// Add to index.css:
// .striking-ball-3d { width: 80px; height: 80px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #1e3a8a 70%, #fbbf24 100%); box-shadow: 0 8px 32px 0 #1e3a8a55, 0 0 24px 8px #fbbf24cc; position: relative; transition: transform 0.2s cubic-bezier(.68,-0.55,.27,1.55); }
// .dark .striking-ball-3d { background: radial-gradient(circle at 30% 30%, #38bdf8 70%, #fbbf24 100%); box-shadow: 0 8px 32px 0 #38bdf855, 0 0 24px 8px #fbbf24cc; }
// .striking-ball-3d .shine { position: absolute; top: 18px; left: 18px; width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.5); filter: blur(2px); opacity: 0.7; }
// .striking-ball-3d .shadow { position: absolute; bottom: 8px; right: 8px; width: 32px; height: 16px; border-radius: 50%; background: rgba(30,41,59,0.25); filter: blur(2px); opacity: 0.5; } 