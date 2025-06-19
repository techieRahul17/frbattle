"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        // On mount, check localStorage or system preference
        const saved = localStorage.getItem("theme")
        if (saved === "dark") {
            setIsDark(true)
        } else if (saved === "light") {
            setIsDark(false)
        } else {
            // Use system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            setIsDark(prefersDark)
        }
    }, [])

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [isDark])

    let toggleTheme = () => setIsDark((d) => !d)

    return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider")
    }
    return context
}
