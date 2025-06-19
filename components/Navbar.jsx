"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../contexts/ThemeContext"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("hero")
    const { isDark, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            // Update active section
            const sections = ["hero", "brand-kits", "cards", "stats", "graph", "customers"]
            const current = sections.find((section) => {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    return rect.top <= 100 && rect.bottom >= 100
                }
                return false
            })
            if (current) setActiveSection(current)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <nav
            className={`fixed top-0 w-full z-40 transition-all duration-500 ${
                isScrolled
                    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-cyan-200/20 dark:border-neon-cyan/20"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 group cursor-pointer">
                        <div className="relative">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-neon-cyan dark:via-neon-purple dark:to-neon-pink bg-clip-text text-transparent">
                                NeoCarbon
                            </h1>
                            <span className="text-sm font-light text-gray-600 dark:text-gray-400 tracking-wider">NEXUS</span>
                            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 dark:from-neon-cyan/20 dark:to-neon-pink/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-1">
                            {[
                                { id: "hero", label: "Home" },
                                { id: "brand-kits", label: "Brand Kits" },
                                { id: "cards", label: "Projects" },
                                { id: "stats", label: "Analytics" },
                                { id: "graph", label: "Reports" },
                                { id: "customers", label: "Testimonials" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                                        activeSection === item.id
                                            ? "text-cyan-600 dark:text-neon-cyan"
                                            : "text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-neon-cyan"
                                    }`}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 dark:from-neon-cyan/10 dark:to-neon-purple/10 rounded-xl"></div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-600/0 group-hover:from-cyan-500/5 group-hover:to-purple-600/5 dark:group-hover:from-neon-cyan/5 dark:group-hover:to-neon-purple/5 rounded-xl transition-all duration-300"></div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Theme Toggle & Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                            className={`relative p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 group overflow-hidden
                                ${isDark ? "bg-gradient-to-r from-cyan-700/20 to-blue-900/20 text-cyan-200" : "bg-gradient-to-r from-blue-100/60 to-amber-100/60 text-blue-700"}`}
                        >
                            <div className="relative z-10">
                                {isDark ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
                        </button>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden relative p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-600/10 dark:from-neon-cyan/10 dark:to-neon-purple/10 text-gray-700 dark:text-gray-300 overflow-hidden group"
                        >
                            <div className="relative z-10">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 dark:from-neon-cyan dark:to-neon-purple opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-cyan-200/20 dark:border-neon-cyan/20 shadow-2xl">
                        <div className="px-4 py-6 space-y-2">
                            {[
                                { id: "hero", label: "Home" },
                                { id: "brand-kits", label: "Brand Kits" },
                                { id: "cards", label: "Projects" },
                                { id: "stats", label: "Analytics" },
                                { id: "graph", label: "Reports" },
                                { id: "customers", label: "Testimonials" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-neon-cyan hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-purple-600/5 dark:hover:from-neon-cyan/5 dark:hover:to-neon-purple/5 transition-all duration-300"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
