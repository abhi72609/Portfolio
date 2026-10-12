
function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#0b0b0e] text-white"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-lime-400/10 blur-[120px]" />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-28">
        {/* Left: Introduction */}
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_#a3e635]" />
            <span className="text-xs font-medium tracking-wide text-zinc-300">
              OPEN TO OPPORTUNITIES
            </span>
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
            Full Stack Developer
          </p>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I'm Abhishek
            <span className="mt-2 block text-zinc-500">
              Kumar Raj<span className="text-lime-400">.</span>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
            I build responsive web applications and turn ideas into useful
            digital experiences. I enjoy working across the frontend,
            backend, and database to solve real-world problems.
          </p>

          {/* Action buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-lg bg-lime-400 px-6 py-3.5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-lime-300"
            >
              Explore My Work
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                ↗
              </span>
            </a>

            <a
              href="#contact"
              className="rounded-lg border border-white/15 px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5"
            >
              Contact Me
            </a>
          </div>

          {/* Technologies */}
          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="mb-4 text-xs uppercase tracking-widest text-zinc-500">
              Technologies I work with
            </p>

            <div className="flex flex-wrap gap-3">
              {['React', 'JavaScript', 'Python', 'SQL', 'Tailwind CSS'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Right: Developer visual */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-5 rounded-3xl bg-lime-400/[0.06] blur-2xl" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111114] shadow-2xl shadow-black/30">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-lime-400/80" />
              </div>

              <span className="text-xs text-zinc-500">
                developer.jsx
              </span>
            </div>

            {/* Code-style card */}
            <div className="space-y-5 p-6 font-mono text-sm leading-7 sm:p-9">
              <p className="text-zinc-500">
                <span className="text-purple-400">const</span> developer = {'{'}
              </p>

              <div className="space-y-2 pl-5 sm:pl-7">
                <p>
                  <span className="text-sky-300">name</span>
                  <span className="text-zinc-400">: </span>
                  <span className="text-lime-300">'Abhishek Raj'</span>,
                </p>

                <p>
                  <span className="text-sky-300">role</span>
                  <span className="text-zinc-400">: </span>
                  <span className="text-lime-300">'Full Stack Developer'</span>,
                </p>

                <p>
                  <span className="text-sky-300">focus</span>
                  <span className="text-zinc-400">: [</span>
                </p>

                <div className="pl-5">
                  <p className="text-lime-300">'Clean UI',</p>
                  <p className="text-lime-300">'Useful products',</p>
                  <p className="text-lime-300">'Continuous learning'</p>
                </div>

                <p className="text-zinc-400">],</p>

                <p>
                  <span className="text-sky-300">available</span>
                  <span className="text-zinc-400">: </span>
                  <span className="text-orange-300">true</span>
                </p>
              </div>

              <p className="text-zinc-500">{'}'}</p>

              <div className="border-t border-white/10 pt-5">
                <p className="text-zinc-500">
                  <span className="text-purple-400">function</span>{' '}
                  <span className="text-sky-300">buildSomethingGreat</span>() {'{'}
                </p>
                <p className="pl-5 text-zinc-300">
                  return <span className="text-lime-300">'Let's build it.'</span>
                </p>
                <p className="text-zinc-500">{'}'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-6 py-4">
              <span className="text-xs text-zinc-500">Status</span>
              <span className="flex items-center gap-2 text-xs text-lime-400">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                Always learning
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
