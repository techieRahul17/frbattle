"use client"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        Product: ["Features", "Analytics", "Reports", "API"],
        Company: ["About", "Careers", "Press", "Contact"],
        Resources: ["Documentation", "Help Center", "Community", "Blog"],
        Legal: ["Privacy", "Terms", "Security", "Compliance"],
    }

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            Carbon Dashboard
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Advanced analytics and insights for sustainable business operations. Track, measure, and optimize your
                            environmental impact.
                        </p>
                        <div className="flex space-x-4">
                            {["twitter", "linkedin", "github"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
                                >
                                    <span className="sr-only">{social}</span>
                                    <div className="w-5 h-5 bg-current"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold mb-4">{category}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">© {currentYear} Carbon Dashboard. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
