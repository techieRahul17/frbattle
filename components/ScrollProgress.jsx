"use client"

import { useState, useEffect } from "react"

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (window.scrollY / totalHeight) * 100
            setScrollProgress(progress)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/30 dark:bg-gray-800/30 z-50">
            <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 dark:from-neon-cyan dark:via-neon-purple dark:to-neon-pink transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    )
}
