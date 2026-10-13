// function CTASection() {
//   return (
//     <section className="bg-[#050605] px-6 py-20">
//       <div className="mx-auto max-w-5xl rounded-3xl border border-[#315B3D]/40 bg-gradient-to-br from-[#142219] to-[#080A08] px-6 py-16 text-center sm:px-12">
//         <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8FB598]">
//           Ready to get started?
//         </p>

//         <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#F2F4F2] sm:text-5xl">
//           Your next opportunity
//           <span className="block text-[#72977A]">
//             starts with your portfolio.
//           </span>
//         </h2>

//         <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
//           Choose a template, showcase your skills and projects,
//           and create a portfolio you can share with recruiters.
//         </p>

//         <a
//           href="#templates"
//           className="mt-8 inline-flex rounded-lg bg-[#1B4332] px-7 py-3.5 font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-[#2D6A4F]"
//         >
//           Explore templates →
//         </a>
//       </div>
//     </section>
//   );
// }

// export default CTASection;


function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#080A09] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0D100E] px-6 py-16 text-center sm:px-12 sm:py-24">

          {/* Subtle decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-[#91A995]/[0.06] blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#91A995] sm:text-sm">
              Ready for your next chapter?
            </p>

            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-[#F3F2ED] sm:text-5xl lg:text-6xl">
              Your work deserves
              <span className="block font-normal text-[#A6B9A8]">
                to be seen.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#A3A6A1] sm:text-lg">
              Bring your experience, skills, and projects together
              in one beautiful portfolio. Choose your style and
              create a link you can share with the world.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#A6B9A8] px-7 py-4 font-semibold text-[#101510] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C0D0C1] hover:shadow-lg hover:shadow-[#A6B9A8]/10"
              >
                Build your portfolio
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href="#templates"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-7 py-4 font-medium text-[#E5E7E2] transition-all duration-300 hover:border-[#A6B9A8]/50 hover:bg-white/[0.04]"
              >
                Explore templates
              </a>
            </div>

            <p className="mt-8 text-sm text-[#777D77]">
              Simple to create. Yours to share.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
