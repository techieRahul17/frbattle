"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import BrandKits from "../components/BrandKits"
import CardsSection from "../components/CardsSection"
import StatsSection from "../components/StatsSection"
import GraphSection from "../components/GraphSection"
import CustomerSection from "../components/CustomerSection"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import ScrollProgress from "../components/ScrollProgress"
import { ThemeProvider } from "../contexts/ThemeContext"
import ParallaxSection from "../components/ParallaxSection"
import RippleButton from "../components/RippleButton"
import ScrollPopUpSection from "../components/ScrollPopUpSection"
import StrikingObjectSection from "../components/StrikingObjectSection"
import CarouselSection from "../components/CarouselSection"

export default function HomePage() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 4000)

        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-purple-900 dark:to-black transition-all duration-500">
                <ScrollProgress />
                <Navbar />
                <Hero />
                <div className="flex justify-center my-8">
                  <RippleButton className="px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-blue-700 transition">Try Ripple Effect</RippleButton>
                </div>
                <ParallaxSection />
                <CardsSection />
                <ScrollPopUpSection />
                <StatsSection />
                <CarouselSection />
                <GraphSection />
                <StrikingObjectSection />
                <CustomerSection />
                <Footer />
            </div>
        </ThemeProvider>
    )
}
