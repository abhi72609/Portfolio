import Logo from "../common/Logo";

const navLinks = [
  { label: "Home", href: "#Home" },
  { label: "Features", href: "#how-it-works" },
  { label: "Templates", href: "#templates" },
  { label: "About", href: "#about" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#070908]/90 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <Logo />

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-sm font-medium text-[#C1CBC4] transition-colors duration-200 hover:text-[#8AFFC1]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="/login"
            className="text-sm font-semibold text-white transition-colors duration-200 hover:text-[#8AFFC1]"
          >
            Log in
          </a>

          <a
            href="/create-portfolio"
            className="group inline-flex items-center justify-center gap-2 rounded-lg border border-[#00C875] bg-[#00C875] px-4 py-2.5 text-sm font-bold text-[#041109] shadow-[0_0_20px_rgba(0,200,117,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00E68A] hover:bg-[#00E68A] hover:shadow-[0_0_28px_rgba(0,230,138,0.25)] sm:px-5"
          >
            Get started
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
