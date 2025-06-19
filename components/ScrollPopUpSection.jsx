import { useRef, useEffect, useState } from "react"

export default function ScrollPopUpSection() {
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-blue-200/40 to-purple-200/40 dark:from-gray-800 dark:to-gray-900">
      <div className={`transition-all duration-700 transform ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-12"} bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-12 text-center max-w-2xl mx-auto`}> 
        <h2 className="text-4xl font-bold mb-4 text-purple-700 dark:text-purple-300">Scroll & Pop Up</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200">This section animates into view as you scroll, just like the reference video. Use this effect for cards, features, or any content you want to highlight!</p>
      </div>
    </section>
  )
} 