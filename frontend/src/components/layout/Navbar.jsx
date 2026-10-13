
import Logo from "../common/Logo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "How it works", href: "#how-it-works" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080B09]/90 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#9CA79E] transition-colors duration-300 hover:text-[#C2D3C4]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <a
            href="/login"
            className="text-sm text-[#C2D3C4] transition-colors duration-300 hover:text-white"
          >
            Log in
          </a>

          <a
            href="/signup"
            className="inline-flex items-center gap-2 rounded-lg border border-[#456B50] bg-[#456B50] px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#527B5D] hover:shadow-lg hover:shadow-green-950/30 motion-reduce:transform-none"
          >
            Get started
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
