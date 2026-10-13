function Logo() {
  return (
    <a
      href="/"
      aria-label="Portfolia home"
      className="group inline-flex shrink-0 items-center gap-3"
    >
      <span className="grid size-10 place-items-center rounded-xl border border-[#00C875]/40 bg-[#00C875]/10 text-lg font-bold text-[#00E68A] shadow-[0_0_18px_rgba(0,200,117,0.08)] transition-all duration-300 group-hover:border-[#00E68A] group-hover:bg-[#00C875]/20 group-hover:shadow-[0_0_22px_rgba(0,230,138,0.18)]">
        P
      </span>

      <span className="text-xl font-bold tracking-tight text-[#F4F7F4] transition-colors duration-300 group-hover:text-white">
        Portfolia<span className="text-[#00C875]">.</span>
      </span>
    </a>
  );
}

export default Logo;