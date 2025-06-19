"use client"

import { useState, useEffect, useRef } from "react"
import RippleButton from "./RippleButton.jsx";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [ripples, setRipples] = useState([])
    const heroRef = useRef(null)

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect()
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                })
            }
        }

        const handleClick = (e) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect()
                const newRipple = {
                    id: Date.now(),
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                }
                setRipples((prev) => [...prev, newRipple])

                setTimeout(() => {
                    setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
                }, 1000)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("click", handleClick)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("click", handleClick)
        }
    }, [])

    const scrollToNext = () => {
        const nextSection = document.getElementById("brand-kits")
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-pointer"
        >
            {/* Dynamic Gradient Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600 dark:from-gray-900 dark:via-purple-900 dark:to-black transition-all duration-1000"
                style={{
                    background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(6, 182, 212, 0.4) 0%, 
              rgba(59, 130, 246, 0.3) 25%, 
              rgba(147, 51, 234, 0.2) 50%, 
              transparent 70%
            ),
            linear-gradient(135deg, 
              rgba(6, 182, 212, 0.1) 0%, 
              rgba(59, 130, 246, 0.1) 25%, 
              rgba(147, 51, 234, 0.1) 50%, 
              rgba(236, 72, 153, 0.1) 75%, 
              transparent 100%
            )
          `,
                }}
            />

            {/* Animated Wave Background */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
                    <path
                        d="M0,400 C300,300 600,500 900,400 C1050,350 1200,400 1200,400 L1200,800 L0,800 Z"
                        fill="url(#wave1)"
                        className="animate-wave"
                    />
                    <path
                        d="M0,500 C300,400 600,600 900,500 C1050,450 1200,500 1200,500 L1200,800 L0,800 Z"
                        fill="url(#wave2)"
                        className="animate-wave-reverse"
                    />
                    <defs>
                        <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
                        </linearGradient>
                        <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.2)" />
                            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.2)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Floating 3D Elements */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute floating-element"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 5}s`,
                        }}
                    >
                        <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-neon-cyan dark:to-neon-purple rounded-full opacity-60 animate-pulse transform rotate-45"></div>
                    </div>
                ))}
            </div>

            {/* Ripple Effects */}
            {ripples.map((ripple) => (
                <div
                    key={ripple.id}
                    className="absolute pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <div className="w-0 h-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 dark:from-neon-cyan/30 dark:to-neon-purple/30 animate-ripple"></div>
                </div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                {/* Logo Animation */}
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full blur-3xl animate-pulse"></div>
                    <h1 className="relative text-7xl md:text-9xl font-bold bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 dark:from-cyan-400 dark:via-blue-400 dark:to-sky-300 bg-clip-text text-transparent animate-gradient-x">
                        ProAnalytics
                    </h1>
                    <h2 className="text-3xl md:text-5xl font-light text-blue-700 dark:text-cyan-400 mt-2 tracking-[0.3em] animate-fade-in-delay">
                        INSIGHT HUB
                    </h2>
                </div>

                {/* Subtitle */}
                <p className="text-xl md:text-3xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay-2">
                    Revolutionary Carbon Analytics Platform
                    <br />
                    <span className="text-lg md:text-xl bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-neon-cyan dark:to-neon-purple bg-clip-text text-transparent">
            Transforming Sustainability Through Advanced Intelligence
          </span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-delay-3">
                    <RippleButton className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-neon-cyan dark:to-neon-purple text-white rounded-2xl font-semibold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 dark:hover:shadow-neon-cyan/25">
                        <span className="relative z-10">Explore Dashboard</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-neon-purple dark:to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 animate-shimmer"></div>
                    </RippleButton>
                    <RippleButton className="group relative px-10 py-4 border-2 border-cyan-500/50 dark:border-neon-cyan/50 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold text-lg overflow-hidden transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Watch Demo</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-neon-cyan dark:to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </RippleButton>
                </div>

                {/* Stats Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-delay-4">
                    {[
                        { value: "45K+", label: "Carbon Footprint Tracked", unit: "tCO₂e" },
                        { value: "123", label: "Energy Intensity", unit: "kWh/m²" },
                        { value: "47M+", label: "Energy Consumption", unit: "kWh" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="group relative p-6 rounded-2xl bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm border border-cyan-200/20 dark:border-neon-cyan/20 hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300"
                        >
                            <div className="text-3xl font-bold text-cyan-600 dark:text-neon-cyan mb-2">{stat.value}</div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.unit}</div>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-600/5 dark:from-neon-cyan/5 dark:to-neon-purple/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
                onClick={scrollToNext}
            >
                <div className="flex flex-col items-center animate-bounce">
                    <div className="w-6 h-10 border-2 border-cyan-500/50 dark:border-neon-cyan/50 rounded-full flex justify-center group-hover:border-cyan-500 dark:group-hover:border-neon-cyan transition-colors duration-300">
                        <div className="w-1 h-3 bg-cyan-500/50 dark:bg-neon-cyan/50 rounded-full mt-2 animate-pulse group-hover:bg-cyan-500 dark:group-hover:bg-neon-cyan transition-colors duration-300"></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 group-hover:text-cyan-500 dark:group-hover:text-neon-cyan transition-colors duration-300">
            Scroll
          </span>
                </div>
            </div>
        </section>
    )
}
