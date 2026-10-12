
function About() {
  return (
    <section id="about" className="border-t border-white/10 bg-[#0b0b0e] px-6 py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
          About Me
        </p>

        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            I enjoy building things that solve
            <span className="text-zinc-500"> real problems.</span>
          </h2>

          <div>
            <p className="leading-8 text-zinc-400">
              I'm Abhishek Kumar Raj, a Computer Science Engineering graduate
              interested in full-stack development and building practical web
              applications. I enjoy learning new technologies and turning
              ideas into reliable digital experiences.
            </p>

            <p className="mt-5 leading-8 text-zinc-400">
              My projects include a hospital website, an inventory management
              system, and an online painting marketplace. I aim to write
              maintainable code and create interfaces that are simple to use.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-2xl font-bold text-lime-400">React</p>
                <p className="mt-2 text-sm text-zinc-500">Frontend development</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-2xl font-bold text-lime-400">Full Stack</p>
                <p className="mt-2 text-sm text-zinc-500">End-to-end applications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About