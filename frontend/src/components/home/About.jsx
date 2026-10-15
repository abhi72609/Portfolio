// function About() {
//   return (
//     <section className="bg-[#050605] px-6 py-20 text-white">
//       <div className="mx-auto max-w-7xl">
//         <p className="text-sm uppercase tracking-[0.25em] text-[#72977A]">
//           About Portfolia
//         </p>

//         <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
//           Your story deserves its own space.
//         </h2>

//         <p className="mt-5 max-w-2xl leading-7 text-gray-400">
//           Create a personal portfolio, showcase your skills and projects,
//           and share your unique website with the world.
//         </p>
//       </div>
//     </section>
//   );
// }

// export default About;



function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[#080B09] px-6 py-24 text-white sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-emerald-500/[0.06] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-[#5AFFB7]">
            About PortfolioForge
          </p>

          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Your story deserves its own space.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            From your education and first projects to your professional
            achievements, bring everything together in one beautiful
            portfolio. Choose a design that reflects your journey and
            share your own website with the world.
          </p>

          <a
            href="#templates"
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-emerald-400 px-6 py-3.5 text-sm font-bold text-[#041109] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          >
            Explore templates
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <span className="text-3xl font-extrabold text-[#5AFFB7] sm:text-4xl">
              01
            </span>
            <h3 className="mt-4 text-lg font-bold">Your journey</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Present your education, experience and achievements.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <span className="text-3xl font-extrabold text-[#5AFFB7] sm:text-4xl">
              02
            </span>
            <h3 className="mt-4 text-lg font-bold">Your projects</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Showcase your work, skills and creative ideas.
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-xl text-[#5AFFB7]">
                ↗
              </div>
              <div>
                <h3 className="font-bold">One link. Your own portfolio.</h3>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Create a professional space you can share with recruiters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;