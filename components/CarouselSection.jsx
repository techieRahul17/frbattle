import { useState, useRef } from "react"
import RippleButton from "./RippleButton"

const slides = [
  {
    title: "Feature One",
    desc: "This is the first feature, beautifully animated.",
    img: "/cards.png",
  },
  {
    title: "Feature Two",
    desc: "Second feature with smooth transitions.",
    img: "/graph.png",
  },
  {
    title: "Feature Three",
    desc: "Third feature, carousel style!",
    img: "/stats.png",
  },
]

export default function CarouselSection() {
  const [current, setCurrent] = useState(0)
  const startX = useRef(null)

  const next = () => setCurrent((c) => (c + 1) % slides.length)
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)

  // Swipe/drag support
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (startX.current !== null) {
      const diff = e.changedTouches[0].clientX - startX.current
      if (diff > 50) prev()
      else if (diff < -50) next()
      startX.current = null
    }
  }

  return (
    <section className="min-h-[40vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-100 to-amber-50 dark:from-navy-950 dark:via-blue-950 dark:to-amber-900 py-16">
      <h2 className="text-4xl font-bold mb-8 text-blue-700 dark:text-cyan-300">Carousel Animation</h2>
      <div className="relative w-full max-w-xl mx-auto">
        <div
          className="overflow-hidden rounded-2xl shadow-xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${current * 100}%)` }}>
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`min-w-full flex flex-col items-center p-8 transition-all duration-700 ${current === i ? "opacity-100 scale-100" : "opacity-0 scale-90"} bg-gradient-to-br from-white via-blue-50 to-amber-50 dark:from-blue-900 dark:via-navy-950 dark:to-amber-900`}
                style={{ zIndex: current === i ? 2 : 1 }}
              >
                <img src={slide.img} alt={slide.title} className="w-32 h-32 object-contain mb-4 rounded-xl shadow-lg" />
                <h3 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-cyan-200">{slide.title}</h3>
                <p className="text-gray-700 dark:text-gray-200">{slide.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <RippleButton onClick={prev} className="px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">Prev</RippleButton>
          <RippleButton onClick={next} className="px-4 py-2 bg-amber-500 text-white rounded-full shadow hover:bg-amber-600 transition">Next</RippleButton>
        </div>
      </div>
    </section>
  )
} 