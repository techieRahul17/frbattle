"use client"

import { useState, useEffect } from "react"

export default function CustomerSection() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Sustainability Director",
            company: "EcoTech Solutions",
            image: "/placeholder.svg?height=80&width=80",
            content:
                "This dashboard has revolutionized how we track and manage our carbon footprint. The insights are invaluable for our sustainability goals.",
            rating: 5,
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Operations Manager",
            company: "Green Building Corp",
            image: "/placeholder.svg?height=80&width=80",
            content:
                "The real-time analytics and comprehensive reporting features have made our environmental compliance so much easier to manage.",
            rating: 5,
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Environmental Analyst",
            company: "Sustainable Ventures",
            image: "/placeholder.svg?height=80&width=80",
            content:
                "Outstanding platform! The data visualization capabilities help us communicate our environmental impact effectively to stakeholders.",
            rating: 5,
        },
        {
            id: 4,
            name: "David Thompson",
            role: "Chief Sustainability Officer",
            company: "Future Energy Ltd",
            image: "/placeholder.svg?height=80&width=80",
            content:
                "The portfolio management features and energy consumption tracking have been game-changers for our organization.",
            rating: 5,
        },
    ]

    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [isAutoPlaying, testimonials.length])

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        setIsAutoPlaying(false)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
        setIsAutoPlaying(false)
    }

    const goToTestimonial = (index) => {
        setCurrentTestimonial(index)
        setIsAutoPlaying(false)
    }

    return (
        <section
            id="customers"
            className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Customers Say</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Discover how organizations worldwide are transforming their sustainability practices with our platform
                    </p>
                </div>

                <div className="relative">
                    {/* Main testimonial card */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 lg:p-12 mx-auto max-w-4xl">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                            {/* Customer image */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <img
                                        src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                                        alt={testimonials[currentTestimonial].name}
                                        className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-purple-200 dark:border-purple-700"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial content */}
                            <div className="flex-1 text-center lg:text-left">
                                {/* Stars */}
                                <div className="flex justify-center lg:justify-start mb-4">
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                    "{testimonials[currentTestimonial].content}"
                                </blockquote>

                                {/* Customer info */}
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {testimonials[currentTestimonial].name}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">{testimonials[currentTestimonial].role}</p>
                                    <p className="text-purple-600 dark:text-purple-400 font-medium">
                                        {testimonials[currentTestimonial].company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation arrows */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 hover:shadow-xl"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 hover:shadow-xl"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                index === currentTestimonial
                                    ? "bg-purple-600 scale-125"
                                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                            }`}
                        />
                    ))}
                </div>

                {/* Customer logos */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Trusted by leading organizations worldwide</p>
                    <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
                        {["EcoTech", "GreenBuild", "Sustainable", "FutureEnergy", "CleanTech", "EcoSolutions"].map(
                            (company, index) => (
                                <div key={index} className="text-2xl font-bold text-gray-400 dark:text-gray-600 mb-4">
                                    {company}
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
