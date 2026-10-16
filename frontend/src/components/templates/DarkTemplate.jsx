
function DarkTemplate({ data = {} }) {
  const {
    name = "Alex Morgan",
    role = "Full-Stack Developer",
    about = "I build powerful digital experiences with clean code, thoughtful design, and modern technology.",
    projects = [],
  } = data;

  const firstName = name.split(" ")[0];

  return (
    <main className="min-h-screen overflow-hidden bg-[#070908] text-[#F4F7F4]">
      {/* Navigation */}
      <header className="border-b border-white/[0.08]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <a href="#dark-home" className="text-xl font-black tracking-tight">
            {firstName}
            <span className="text-[#00E68A]">.</span>
          </a>

          <div className="flex items-center gap-4 text-sm text-[#A4B0A8] sm:gap-7">
            <a href="#dark-about" className="transition hover:text-[#00E68A]">
              About
            </a>
            <a href="#dark-work" className="transition hover:text-[#00E68A]">
              Projects
            </a>
            <a href="#dark-contact" className="transition hover:text-[#00E68A]">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="dark-home"
        className="relative isolate border-b border-white/[0.08]"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgba(0,200,117,0.13),transparent_45%)]" />

        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#00C875]/30 bg-[#00C875]/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8AFFC1]">
            <span className="size-2 rounded-full bg-[#00E68A]" />
            Available for opportunities
          </div>

          <div className="mb-5">
            <p className="text-sm font-medium text-[#A4B0A8]">
              Hello, I'm {name}
            </p>
            <p className="mt-2 text-base font-semibold text-[#8AFFC1]">
              {role}
            </p>
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
            Building digital
            <br />
            <span className="text-[#00E68A]">
              things that matter.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#A4B0A8]">
            {about}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#dark-work"
              className="inline-flex items-center gap-3 rounded-lg bg-[#00C875] px-6 py-3.5 font-bold text-[#041109] transition hover:-translate-y-1 hover:bg-[#00E68A]"
            >
              Explore projects <span aria-hidden="true">↘</span>
            </a>

            <a
              href="#dark-contact"
              className="inline-flex items-center gap-3 rounded-lg border border-white/15 px-6 py-3.5 font-semibold transition hover:border-[#00C875] hover:text-[#8AFFC1]"
            >
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="mt-16 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              { label: "Focus", value: "Development" },
              { label: "Approach", value: "User-first" },
              { label: "Mindset", value: "Always learning" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"
              >
                <p className="text-xs text-[#A4B0A8]">{item.label}</p>
                <p className="mt-2 text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="dark-about" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00E68A]">
          About me
        </p>

        <div className="mt-5 grid gap-6 md:grid-cols-[1fr_1.3fr] md:gap-12">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Thoughtful work.
            <span className="block text-[#A4B0A8]">Meaningful impact.</span>
          </h2>

          <div>
            <p className="text-lg font-semibold">{role}</p>
            <p className="mt-4 leading-8 text-[#A4B0A8]">{about}</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="dark-work"
        className="border-y border-white/[0.08] bg-[#0B100D] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00E68A]">
                Selected work
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                Featured projects
              </h2>
            </div>

            <span className="text-sm text-[#A4B0A8]">
              {String(projects.length).padStart(2, "0")} projects
            </span>
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project, index) => (
                <article
                  key={project.id ?? index}
                  className="group rounded-2xl border border-white/10 bg-[#111713] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#00C875]/60 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#00E68A]">
                      PROJECT / {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xl transition group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <h3 className="mt-10 text-2xl font-bold">
                    {project.title ?? project.name ?? `Project ${index + 1}`}
                  </h3>

                  <p className="mt-3 leading-7 text-[#A4B0A8]">
                    {project.description ?? "A project showcasing my work."}
                  </p>

                  {project.technologies && (
                    <p className="mt-5 text-sm text-[#8AFFC1]">
                      {Array.isArray(project.technologies)
                        ? project.technologies.join(" · ")
                        : project.technologies}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
              <p className="text-lg font-semibold">Projects coming soon.</p>
              <p className="mt-2 text-sm text-[#A4B0A8]">
                Add your projects to showcase your work here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="dark-contact" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="rounded-3xl border border-[#00C875]/25 bg-[radial-gradient(ellipse_at_top,rgba(0,200,117,0.12),transparent_65%)] px-6 py-12 sm:px-12 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00E68A]">
            Let's connect
          </p>

          <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Have an interesting project in mind?
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-[#A4B0A8]">
            I'm always interested in discussing new ideas and opportunities.
          </p>

          <a
            href="mailto:hello@example.com"
            className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#00C875] px-6 py-3.5 font-bold text-[#041109] transition hover:bg-[#00E68A]"
          >
            Say hello <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-[#A4B0A8] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <a href="#dark-home" className="transition hover:text-[#8AFFC1]">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}

export default DarkTemplate;
