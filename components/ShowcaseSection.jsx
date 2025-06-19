import React from "react"

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="py-24 bg-gradient-to-br from-cyan-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-purple-900 dark:to-black">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-700 dark:text-neon-purple">Showcase</h2>
        {/* Showcase content will go here */}
        <div className="w-full h-64 bg-purple-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-2xl text-gray-400">
          Showcase Placeholder
        </div>
      </div>
    </section>
  )
} 