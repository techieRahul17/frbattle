"use client"

import { useState, useEffect } from "react"

export default function CardsSection() {
    const [visibleCards, setVisibleCards] = useState([])

    const cards = [
        { id: 1, title: "Project Alpha", category: "Development", color: "from-blue-500 to-purple-600", delay: 0 },
        { id: 2, title: "Brand Identity", category: "Design", color: "from-green-500 to-teal-600", delay: 100 },
        { id: 3, title: "Data Analytics", category: "Analytics", color: "from-orange-500 to-red-600", delay: 200 },
        { id: 4, title: "User Research", category: "Research", color: "from-purple-500 to-pink-600", delay: 300 },
        { id: 5, title: "Mobile App", category: "Development", color: "from-indigo-500 to-blue-600", delay: 400 },
        { id: 6, title: "Marketing Campaign", category: "Marketing", color: "from-yellow-500 to-orange-600", delay: 500 },
        { id: 7, title: "E-commerce Platform", category: "Development", color: "from-teal-500 to-green-600", delay: 600 },
        { id: 8, title: "Content Strategy", category: "Content", color: "from-pink-500 to-rose-600", delay: 700 },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cardId = Number.parseInt(entry.target.dataset.cardId)
                        setVisibleCards((prev) => [...new Set([...prev, cardId])])
                    }
                })
            },
            { threshold: 0.1 },
        )

        const cardElements = document.querySelectorAll("[data-card-id]")
        cardElements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section id="cards" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore our diverse portfolio of innovative solutions and creative projects
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            data-card-id={card.id}
                            className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                                visibleCards.includes(card.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                            style={{
                                transitionDelay: `${card.delay}ms`,
                                animationDelay: `${card.delay}ms`,
                            }}
                        >
                            {/* Gradient Background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
                            ></div>

                            {/* Content */}
                            <div className="relative p-6 h-48 flex flex-col justify-between text-white">
                                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-3">
                    {card.category}
                  </span>
                                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm opacity-80">View Project</span>
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
