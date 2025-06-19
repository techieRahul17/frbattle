"use client"

import { useState, useEffect } from "react"

export default function StatsSection() {
    const [animatedValues, setAnimatedValues] = useState({})
    const [isVisible, setIsVisible] = useState(false)

    const stats = [
        {
            title: "Managed portfolio carbon footprint",
            value: 45048,
            unit: "tCO₂e",
            change: 16,
            changeType: "increase",
            fromYear: "2019",
            yearlyData: [
                { year: "2022", value: 45048, percentage: 100 },
                { year: "2021", value: 14111, percentage: 31 },
                { year: "2020", value: 32813, percentage: 73 },
                { year: "2019", value: 38673, percentage: 86 },
            ],
        },
        {
            title: "Managed portfolio energy intensity",
            value: 123,
            unit: "kWh/m²",
            change: 22,
            changeType: "decrease",
            fromYear: "2019",
            yearlyData: [
                { year: "2022", value: 123, percentage: 100 },
                { year: "2021", value: 128, percentage: 104 },
                { year: "2020", value: 135, percentage: 110 },
                { year: "2019", value: 157, percentage: 128 },
            ],
        },
        {
            title: "Managed portfolio energy consumption",
            value: 47790662,
            unit: "kWh",
            change: 27,
            changeType: "decrease",
            fromYear: "2019",
            yearlyData: [
                { year: "2022", value: 47790662, percentage: 100 },
                { year: "2021", value: 49324077, percentage: 103 },
                { year: "2020", value: 48784205, percentage: 102 },
                { year: "2019", value: 65198706, percentage: 136 },
            ],
        },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                        animateValues()
                    }
                })
            },
            { threshold: 0.3 },
        )

        const section = document.getElementById("stats")
        if (section) observer.observe(section)

        return () => observer.disconnect()
    }, [])

    const animateValues = () => {
        stats.forEach((stat, index) => {
            let current = 0
            const target = stat.value
            const increment = target / 100
            const timer = setInterval(() => {
                current += increment
                if (current >= target) {
                    current = target
                    clearInterval(timer)
                }
                setAnimatedValues((prev) => ({
                    ...prev,
                    [index]: Math.floor(current),
                }))
            }, 20)
        })
    }

    const formatNumber = (num) => {
        return num.toLocaleString()
    }

    return (
        <section id="stats" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Portfolio Statistics</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Track your environmental impact and energy efficiency metrics
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform ${
                                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                            }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            {/* Header */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-4">{stat.title}</h3>
                                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(animatedValues[index] || 0)}
                  </span>
                                    <span className="text-lg text-gray-500 dark:text-gray-400">{stat.unit}</span>
                                </div>
                                <div className="flex items-center mt-2">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">from {stat.fromYear}</span>
                                    <div
                                        className={`flex items-center ${
                                            stat.changeType === "increase" ? "text-red-500" : "text-green-500"
                                        }`}
                                    >
                                        <svg
                                            className={`w-4 h-4 mr-1 ${stat.changeType === "increase" ? "rotate-0" : "rotate-180"}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-sm font-medium">{stat.change}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bars */}
                            <div className="space-y-4">
                                {stat.yearlyData.map((yearData, yearIndex) => (
                                    <div key={yearData.year} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 flex-1">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">{yearData.year}</span>
                                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1000 ease-out"
                                                    style={{
                                                        width: isVisible ? `${yearData.percentage}%` : "0%",
                                                        transitionDelay: `${index * 200 + yearIndex * 100}ms`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white ml-4">
                      {formatNumber(yearData.value)}
                    </span>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex space-x-4">
                                <button className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                                    {index === 0 ? "See full breakdown of carbon footprint" : "Download the data"}
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {index === 0 ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
