"use client"

import { useState, useEffect, useRef } from "react"
import RippleButton from "./RippleButton"

export default function GraphSection() {
    const [activeFilters, setActiveFilters] = useState({
        type: "All",
        status: "Complete",
    })
    const [animatedBars, setAnimatedBars] = useState([])
    const [hoveredBar, setHoveredBar] = useState(null)
    const chartRef = useRef(null)

    const chartData = [
        { value: 549, label: "Q1 2019", category: "Refurbishment" },
        { value: 278, label: "Q2 2019", category: "New build" },
        { value: 875, label: "Q3 2019", category: "Refurbishment" },
        { value: 617, label: "Q4 2019", category: "New build" },
        { value: 506, label: "Q1 2020", category: "Refurbishment" },
        { value: 36, label: "Q2 2020", category: "New build" },
        { value: 185, label: "Q3 2020", category: "Refurbishment" },
        { value: 191, label: "Q4 2020", category: "New build" },
        { value: 122, label: "Q1 2021", category: "Refurbishment" },
        { value: 550, label: "Q2 2021", category: "New build" },
        { value: 881, label: "Q3 2021", category: "Refurbishment" },
        { value: 539, label: "Q4 2021", category: "New build" },
        { value: 269, label: "Q1 2022", category: "Refurbishment" },
        { value: 29, label: "Q2 2022", category: "New build" },
        { value: 82, label: "Q3 2022", category: "Refurbishment" },
        { value: 44, label: "Q4 2022", category: "New build" },
        { value: 109, label: "Q1 2023", category: "Refurbishment" },
        { value: 106, label: "Q2 2023", category: "New build" },
        { value: 607, label: "Q3 2023", category: "Refurbishment" },
        { value: 528, label: "Q4 2023", category: "New build" },
    ]

    const maxValue = Math.max(...chartData.map((d) => d.value))
    const filteredData = chartData.filter((item) => activeFilters.type === "All" || item.category === activeFilters.type)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateBars()
                    }
                })
            },
            { threshold: 0.3 },
        )

        if (chartRef.current) observer.observe(chartRef.current)
        return () => observer.disconnect()
    }, [])

    const animateBars = () => {
        filteredData.forEach((_, index) => {
            setTimeout(() => {
                setAnimatedBars((prev) => [...prev, index])
            }, index * 80)
        })
    }

    const toggleFilter = (filterType, value) => {
        setActiveFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }))
        setAnimatedBars([])
        setTimeout(() => animateBars(), 100)
    }

    return (
        <section id="graph" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-cyan-200/20 dark:border-neon-cyan/20">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-12">
                        <div className="mb-8 lg:mb-0 lg:max-w-md">
                            <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                                <span className="text-gray-800 dark:text-white">EMBODIED</span>
                                <br />
                                <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 dark:from-red-400 dark:via-pink-400 dark:to-purple-500 bg-clip-text text-transparent">
                  CARBON
                </span>
                                <br />
                                <span className="text-gray-800 dark:text-white">EMISSIONS</span>
                            </h2>

                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Intensity measured by kgCO₂e/m²</p>

                            <RippleButton className="group flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-neon-cyan dark:to-neon-purple text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-neon-cyan/25 transition-all duration-300 transform hover:scale-105">
                                <span>Download the data</span>
                                <svg
                                    className="w-5 h-5 ml-2 group-hover:translate-y-0.5 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </RippleButton>
                        </div>

                        {/* Enhanced Filters */}
                        <div className="space-y-8">
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Filter by</h3>

                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Type</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["Refurbishment", "New build", "All"].map((type) => (
                                                <RippleButton
                                                    key={type}
                                                    onClick={() => toggleFilter("type", type)}
                                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                                        activeFilters.type === type
                                                            ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25"
                                                            : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 border border-gray-200 dark:border-gray-500"
                                                    }`}
                                                >
                                                    {type}
                                                </RippleButton>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Status</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["Complete", "Estimate"].map((status) => (
                                                <RippleButton
                                                    key={status}
                                                    onClick={() => toggleFilter("status", status)}
                                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                                        activeFilters.status === status
                                                            ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25"
                                                            : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 border border-gray-200 dark:border-gray-500"
                                                    }`}
                                                >
                                                    {status}
                                                </RippleButton>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Legend */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Key</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-6 h-0.5 border-t-2 border-dashed border-gray-500"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">500 kgCO₂e/m² - Target 2030</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-6 h-0.5 bg-gray-700 dark:bg-gray-400"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">600 kgCO₂e/m² - Target 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Chart */}
                    <div ref={chartRef} className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-inner">
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-8 bottom-8 flex flex-col justify-between text-sm text-gray-500 dark:text-gray-400 -ml-16">
                            {[1200, 1000, 800, 600, 400, 200, 0].map((value) => (
                                <span key={value} className="font-mono">
                  {value}
                </span>
                            ))}
                        </div>

                        {/* Target lines with labels */}
                        <div className="absolute inset-x-8 top-8 bottom-8">
                            <div
                                className="absolute w-full border-t-2 border-dashed border-gray-400 dark:border-gray-500"
                                style={{ top: "58%" }}
                            >
                <span className="absolute -top-6 right-0 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2">
                  500 Target 2030
                </span>
                            </div>
                            <div className="absolute w-full border-t-2 border-gray-600 dark:border-gray-400" style={{ top: "50%" }}>
                <span className="absolute -top-6 right-0 text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-2">
                  600 Target 2025
                </span>
                            </div>
                        </div>

                        {/* Enhanced Chart bars */}
                        <div className="flex items-end justify-between h-96 ml-8 mr-4 relative">
                            {filteredData.map((data, index) => (
                                <div
                                    key={`${data.label}-${index}`}
                                    className="flex flex-col items-center group cursor-pointer relative"
                                    style={{ width: `${100 / filteredData.length}%` }}
                                    onMouseEnter={() => setHoveredBar(index)}
                                    onMouseLeave={() => setHoveredBar(null)}
                                >
                                    <div className="relative flex-1 flex items-end justify-center w-full px-1">
                                        <div
                                            className={`relative rounded-t-lg transition-all duration-1000 ease-out transform group-hover:scale-110 ${
                                                animatedBars.includes(index) ? "opacity-100" : "opacity-0"
                                            } ${
                                                data.category === "Refurbishment"
                                                    ? "bg-gradient-to-t from-red-600 via-red-500 to-red-400 dark:from-red-500 dark:via-red-400 dark:to-red-300"
                                                    : "bg-gradient-to-t from-pink-600 via-pink-500 to-pink-400 dark:from-pink-500 dark:via-pink-400 dark:to-pink-300"
                                            }`}
                                            style={{
                                                height: animatedBars.includes(index) ? `${(data.value / maxValue) * 100}%` : "0%",
                                                width: "80%",
                                                transitionDelay: `${index * 80}ms`,
                                            }}
                                        >
                                            {/* Enhanced Value tooltip */}
                                            <div
                                                className={`absolute -top-16 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                                                    hoveredBar === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
                                                }`}
                                            >
                                                <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-gray-700 dark:border-gray-600">
                                                    <div className="font-bold">{data.value} kgCO₂e/m²</div>
                                                    <div className="text-gray-300 dark:text-gray-400">{data.label}</div>
                                                    <div className="text-gray-400 dark:text-gray-500 text-xs">{data.category}</div>
                                                </div>
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                                            </div>

                                            {/* Glow effect */}
                                            <div
                                                className={`absolute inset-0 rounded-t-lg transition-opacity duration-300 ${
                                                    hoveredBar === index ? "opacity-50" : "opacity-0"
                                                } ${
                                                    data.category === "Refurbishment"
                                                        ? "shadow-lg shadow-red-500/50"
                                                        : "shadow-lg shadow-pink-500/50"
                                                }`}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* X-axis labels */}
                                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 transform -rotate-45 origin-top-left whitespace-nowrap">
                                        {data.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Axis lines */}
                        <div className="absolute left-8 top-8 w-0.5 h-96 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="absolute bottom-16 left-8 right-4 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                    </div>

                    {/* Chart Statistics */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 dark:from-red-400/10 dark:to-pink-400/10 rounded-xl p-4 border border-red-200/20 dark:border-red-400/20">
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {Math.max(...filteredData.map((d) => d.value))}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Peak Emission</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-400/10 dark:to-emerald-400/10 rounded-xl p-4 border border-green-200/20 dark:border-green-400/20">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {Math.min(...filteredData.map((d) => d.value))}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Lowest Emission</div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-400/10 dark:to-cyan-400/10 rounded-xl p-4 border border-blue-200/20 dark:border-blue-400/20">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {Math.round(filteredData.reduce((sum, d) => sum + d.value, 0) / filteredData.length)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Average</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
