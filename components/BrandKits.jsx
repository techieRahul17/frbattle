"use client"

import { useState } from "react"

export default function BrandKits() {
    const [selectedBrand, setSelectedBrand] = useState("The Agency")

    const brands = [
        {
            name: "ECorp",
            color: "from-green-400 to-emerald-500",
            bgColor: "bg-green-500/20",
            enabled: false,
        },
        {
            name: "ICorp",
            color: "from-orange-400 to-yellow-500",
            bgColor: "bg-orange-500/20",
            enabled: false,
        },
        {
            name: "The Agency",
            color: "from-red-400 to-pink-500",
            bgColor: "bg-red-500/20",
            enabled: true,
        },
    ]

    const toggleBrand = (brandName) => {
        setSelectedBrand(brandName)
    }

    return (
        <section id="brand-kits" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Brand Kits</h2>
                    <p className="text-gray-600 dark:text-gray-400">Manage your brand identities and visual assets</p>
                </div>

                <div className="relative">
                    {/* Gradient Border Container */}
                    <div className="p-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl animate-gradient-x">
                        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-8">Brand Kits</h3>

                            <div className="space-y-4">
                                {brands.map((brand) => (
                                    <div
                                        key={brand.name}
                                        className={`group relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                                            selectedBrand === brand.name
                                                ? "border-purple-500 bg-gray-800/50"
                                                : "border-gray-700 hover:border-gray-600 bg-gray-800/30"
                                        }`}
                                        onClick={() => toggleBrand(brand.name)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                {/* Checkbox */}
                                                <div
                                                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                                        selectedBrand === brand.name
                                                            ? "bg-purple-600 border-purple-600"
                                                            : "border-gray-600 hover:border-gray-500"
                                                    }`}
                                                >
                                                    {selectedBrand === brand.name && (
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>

                                                {/* Brand Icon */}
                                                <div
                                                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${brand.color} flex items-center justify-center shadow-lg`}
                                                >
                                                    <div className="w-8 h-8 bg-white rounded-full opacity-90"></div>
                                                </div>

                                                {/* Brand Name */}
                                                <h4 className="text-xl font-semibold text-white">{brand.name}</h4>
                                            </div>

                                            {/* Settings Icon */}
                                            <div className="text-gray-400 hover:text-white transition-colors duration-200">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Ripple Effect */}
                                        <div className="absolute inset-0 rounded-xl overflow-hidden">
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-r ${brand.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
