const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
]

function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0e]/85 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
                {/* Logo */}
                <a
                    href="#home"
                    className="text-2xl font-bold tracking-tight text-white"
                >
                    Portfolio<span className="text-lime-400">.</span>
                </a>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-zinc-400 transition-colors duration-200 hover:text-lime-400"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Contact button */}
                <a
                    href="#contact"
                    className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:border-lime-400 hover:text-lime-400"
                >
                    Let's Talk <span className="ml-1">↗</span>
                </a>
            </nav>
        </header>
    )
}

export default Navbar
