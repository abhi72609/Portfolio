
function Logo() {
  return (
    <a
      href="/"
      aria-label="Portfolia home"
      className="group inline-flex items-center gap-2.5"
    >
      <span className="grid size-9 place-items-center rounded-lg border border-[#304535] bg-[#141A16] text-sm font-semibold text-[#A9C5AD] transition-all duration-300 group-hover:border-[#527B5D] group-hover:bg-[#1B2720]">
        P
      </span>

      <span className="text-xl font-semibold tracking-tight text-[#F0F3EF]">
        Portfolia<span className="text-[#78977D]">.</span>
      </span>
    </a>
  );
}

export default Logo;
