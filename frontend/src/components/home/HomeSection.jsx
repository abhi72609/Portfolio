function HomeSection() {
  return (
    <section id="Home" className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-[#050605] px-6 py-24">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[-15%] h-[450px] w-[450px] rounded-full bg-[#1B4332]/20 blur-[120px]" />

        <div className="absolute bottom-[-20%] left-[10%] h-[350px] w-[350px] rounded-full bg-[#315B3D]/10 blur-[100px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left content */}
        <div className="animate-[fadeUp_0.8s_ease-out_both]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#315B3D]/60 bg-[#102017]/70 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#72977A]" />
            <span className="text-sm text-[#B7CDBB]">
              Your story. Your style. Your portfolio.
            </span>
          </div>

          <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight text-[#F2F4F2] sm:text-6xl lg:text-7xl">
            Welcome to
            <span className="mt-2 block bg-gradient-to-r from-[#72977A] via-[#A3C9A8] to-[#4D8060] bg-clip-text text-transparent">
              Portfolia.
            </span>
            <span className="mt-3 block text-3xl leading-tight text-gray-300 sm:text-4xl lg:text-5xl">
              Build your portfolio.
              <br />
              Make your mark.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
            Choose from beautifully designed templates, add your
            information, and create a professional portfolio with
            your own shareable link. No coding required.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/signup"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#1B4332] px-6 py-4 font-medium text-white shadow-lg shadow-[#1B4332]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#2D6A4F] hover:shadow-[#2D6A4F]/30"
            >
              Build your portfolio
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#templates"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-4 font-medium text-gray-300 transition-all duration-300 hover:border-[#72977A]/60 hover:bg-white/[0.04] hover:text-white"
            >
              Explore templates
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.08] pt-6 text-sm text-gray-400">
            <span>✦ Multiple designs</span>
            <span>↗ Shareable portfolio URL</span>
            <span>✓ No coding required</span>
          </div>
        </div>

        {/* Right portfolio preview */}
        <div className="relative animate-[fadeUp_1s_ease-out_0.2s_both]">
          <div className="absolute inset-0 scale-90 rounded-3xl bg-[#1B4332]/20 blur-3xl" />

          <div className="relative rotate-1 rounded-2xl border border-white/10 bg-[#0C0F0C] p-3 shadow-2xl shadow-black/50 transition-transform duration-500 hover:rotate-0">
            {/* Browser header */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] px-3 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D97777]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#C8A968]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#72977A]" />

              <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1.5 text-center text-xs text-gray-500">
                yourname.portfolia.site
              </div>
            </div>

            {/* Mock portfolio */}
            <div className="p-5 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-wide text-[#A3C9A8]">
                  YOUR NAME.
                </span>
                <span className="text-xs text-gray-500">
                  ABOUT&nbsp;&nbsp; WORK&nbsp;&nbsp; CONTACT
                </span>
              </div>

              <div className="mt-10 grid grid-cols-[1fr_100px] items-center gap-4 sm:grid-cols-[1fr_140px]">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#72977A]">
                    Hello, I'm
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    Alex
                    <br />
                    Morgan<span className="text-[#72977A]">.</span>
                  </h2>

                  <p className="mt-3 text-xs leading-5 text-gray-400 sm:text-sm">
                    Developer & creative thinker
                  </p>

                  <div className="mt-5 inline-flex rounded-lg border border-[#315B3D] px-3 py-2 text-xs text-[#A3C9A8]">
                    View my work ↗
                  </div>
                </div>

                <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl border border-[#315B3D]/50 bg-gradient-to-br from-[#315B3D] via-[#142219] to-[#080A08]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#A3C9A8]/40 bg-black/20 text-3xl text-[#A3C9A8]">
                    A
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/[0.08] pt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Selected projects
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                    <div className="h-12 rounded-lg bg-gradient-to-br from-[#315B3D]/70 to-[#101510]" />
                    <p className="mt-3 text-sm font-medium text-gray-200">
                      Project One
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Web development
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                    <div className="h-12 rounded-lg bg-gradient-to-br from-[#526A52]/50 to-[#101510]" />
                    <p className="mt-3 text-sm font-medium text-gray-200">
                      Project Two
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      UI & design
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-4 rounded-xl border border-[#315B3D]/60 bg-[#101710] px-4 py-3 shadow-xl sm:-left-8">
            <p className="text-xs text-gray-400">Your portfolio</p>
            <p className="mt-1 text-sm font-medium text-[#A3C9A8]">
              Ready to share ↗
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeUp_0\\.8s_ease-out_both\\],
          .animate-\\[fadeUp_1s_ease-out_0\\.2s_both\\] {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default HomeSection;
