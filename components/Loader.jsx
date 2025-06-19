"use client"

import { useState, useEffect } from "react"

export default function Loader() {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState("initializing")

    const phases = [
        { name: "initializing", text: "Initializing ProAnalytics", duration: 1000 },
        { name: "loading", text: "Loading Data Engine", duration: 1500 },
        { name: "processing", text: "Processing Insights", duration: 1000 },
        { name: "finalizing", text: "Finalizing Dashboard", duration: 500 },
    ]

    useEffect(() => {
        let currentPhase = 0
        let currentProgress = 0

        const updatePhase = () => {
            if (currentPhase < phases.length) {
                setPhase(phases[currentPhase].name)

                const phaseProgress = 100 / phases.length
                const startProgress = currentPhase * phaseProgress
                const endProgress = (currentPhase + 1) * phaseProgress

                const interval = setInterval(() => {
                    currentProgress += 2
                    const adjustedProgress = startProgress + (currentProgress / 100) * phaseProgress

                    if (adjustedProgress >= endProgress) {
                        setProgress(endProgress)
                        clearInterval(interval)
                        currentPhase++
                        currentProgress = 0

                        if (currentPhase < phases.length) {
                            setTimeout(updatePhase, 200)
                        }
                    } else {
                        setProgress(adjustedProgress)
                    }
                }, 30)
            }
        }

        updatePhase()
    }, [])

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-slate-100 to-sky-200 dark:from-navy-950 dark:via-blue-950 dark:to-gray-900 flex items-center justify-center z-50 overflow-hidden">
            {/* Animated Subtle Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[600px] h-[600px] rounded-full border-8 border-blue-200/30 dark:border-blue-800/30 animate-spin-slow blur-2xl" />
                <div className="absolute w-[400px] h-[400px] rounded-full border-4 border-cyan-200/30 dark:border-cyan-700/30 animate-spin-reverse blur-xl" />
                <div className="absolute w-[200px] h-[200px] rounded-full border-2 border-sky-300/30 dark:border-cyan-500/30 animate-spin-slow blur" />
            </div>
            {/* Animated Background Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(60)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-300 dark:bg-cyan-700 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>
            {/* 3D Rotating Cube (subtle glow) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="cube-container">
                    <div className="cube pro-cube">
                        <div className="face front"></div>
                        <div className="face back"></div>
                        <div className="face right"></div>
                        <div className="face left"></div>
                        <div className="face top"></div>
                        <div className="face bottom"></div>
                    </div>
                </div>
            </div>
            <div className="relative z-10 text-center">
                {/* Main Logo */}
                <div className="relative mb-12">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 dark:from-cyan-400 dark:via-blue-400 dark:to-sky-300 bg-clip-text text-transparent animate-pulse drop-shadow-xl">
                        ProAnalytics
                    </h1>
                    <h2 className="text-3xl font-light text-blue-700 dark:text-cyan-400 mt-2 tracking-wider">INSIGHT HUB</h2>
                    {/* Glowing Ring */}
                    <div className="absolute -inset-4 rounded-full border-2 border-blue-300/30 dark:border-cyan-700/30 animate-spin-slow"></div>
                    <div className="absolute -inset-8 rounded-full border border-cyan-200/20 dark:border-blue-800/20 animate-spin-reverse"></div>
                </div>
                {/* Progress Section */}
                <div className="w-80 mx-auto">
                    {/* Circular Progress */}
                    <div className="relative w-32 h-32 mx-auto mb-8">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="8" fill="none" />
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                                className="transition-all duration-300 ease-out drop-shadow-xl"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#2563eb" />
                                    <stop offset="50%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#38bdf8" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-blue-700 dark:text-cyan-400 drop-shadow-xl">{Math.round(progress)}%</span>
                        </div>
                    </div>
                    {/* Phase Text */}
                    <div className="mb-6">
                        <p className="text-cyan-700 dark:text-cyan-300 text-lg font-medium capitalize animate-pulse">
                            {phases.find((p) => p.name === phase)?.text || "Loading..."}
                        </p>
                    </div>
                    {/* Linear Progress Bar */}
                    <div className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 dark:from-cyan-400 dark:via-blue-400 dark:to-sky-300 transition-all duration-300 ease-out relative drop-shadow-xl"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                    {/* Loading Dots */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="w-3 h-3 bg-blue-400 dark:bg-cyan-400 rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>
                {/* Bottom Text */}
                <p className="text-gray-500 dark:text-gray-400 mt-8 text-sm tracking-wide">Professional Data Analytics Platform</p>
            </div>
        </div>
    )
}
