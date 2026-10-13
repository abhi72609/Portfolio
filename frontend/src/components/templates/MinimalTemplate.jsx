
function MinimalTemplate({ data = {} }) {
  const {
    name = "Alex Morgan",
    role = "Designer & Developer",
    about = "I create simple, thoughtful digital experiences that solve real problems.",
    projects = [],
  } = data;

  const firstName = name.split(" ")[0];

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#20231F]">
      {/* Navigation */}
      <header className="border-b border-[#20231F]/10">
        <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-6">
          <a
            href="#minimal-home"
            className="text-lg font-bold tracking-tight"
          >
            {firstName}
            <span className="text-[#00A866]">.</span>
          </a>

          <div className="flex gap-4 text-sm text-[#666B64] sm:gap-7">
            <a
              href="#minimal-about"
              className="transition hover:text-[#008C55]"
            >
              About
            </a>
            <a
              href="#minimal-work"
              className="transition hover:text-[#008C55]"
            >
              Work
            </a>
            <a
              href="#minimal-contact"
              className="transition hover:text-[#008C55]"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="minimal-home"
        className="mx-auto max-w-5xl px-6 py-28 sm:py-40"
      >
        <p className="mb-6 text-sm font-medium text-[#008C55]">
          Hello, I'm {name}.
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.1] tracking-tight sm:text-7xl">
          Less, but
          <span className="block text-[#858A82]">better.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8 text-[#666B64]">
          {about}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-6">
          <a
            href="#minimal-work"
            className="inline-flex items-center gap-2 rounded-full bg-[#20231F] px-6 py-3 font-medium text-white transition hover:bg-[#008C55]"
          >
            View my work <span aria-hidden="true">↗</span>
          </a>

          <span className="text-sm text-[#777C74]">{role}</span>
        </div>
      </section>

      {/* About */}
      <section
        id="minimal-about"
        className="border-y border-[#20231F]/10 bg-white"
      >
        <div className="mx-auto grid max-w-5xl gap-5 px-6 py-12 sm:grid-cols-[180px_1fr]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#008C55]">
            A little about me
          </p>

          <p className="max-w-2xl text-lg leading-8 text-[#555B53]">
            {about}
          </p>
        </div>
      </section>

      {/* Projects */}
      <section
        id="minimal-work"
        className="mx-auto max-w-5xl px-6 py-24 sm:py-32"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#008C55]">
              Selected work
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A few things I've made.
            </h2>
          </div>

          <span className="text-sm text-[#777C74]">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>

        {projects.length > 0 ? (
          <div className="divide-y divide-[#20231F]/10 border-y border-[#20231F]/10">
            {projects.map((project, index) => (
              <article
                key={project.id ?? index}
                className="group grid gap-3 py-7 transition sm:grid-cols-[64px_1fr_auto] sm:items-center"
              >
                <span className="text-sm tabular-nums text-[#008C55]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-xl font-semibold tracking-tight transition group-hover:text-[#008C55]">
                    {project.title ??
                      project.name ??
                      `Project ${index + 1}`}
                  </h3>

                  <p className="mt-2 leading-7 text-[#666B64]">
                    {project.description ??
                      "A selected project from my portfolio."}
                  </p>

                  {project.technologies && (
                    <p className="mt-3 text-sm text-[#008C55]">
                      {Array.isArray(project.technologies)
                        ? project.technologies.join(" · ")
                        : project.technologies}
                    </p>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className="text-lg transition-transform group-hover:translate-x-1"
                >
                  ↗
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="border-y border-[#20231F]/10 py-10">
            <p className="font-medium">Projects will appear here.</p>
            <p className="mt-2 text-sm text-[#666B64]">
              Add projects to your portfolio data to showcase your work.
            </p>
          </div>
        )}
      </section>

      {/* Contact */}
      <section id="minimal-contact" className="bg-[#ECEEE9]">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#008C55]">
            Have a project in mind?
          </p>

          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Let's make something meaningful.
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-[#666B64]">
            I'm always open to thoughtful collaborations and interesting
            challenges.
          </p>

          <a
            href="mailto:hello@example.com"
            className="mt-8 inline-flex items-center gap-3 border-b border-[#008C55] pb-2 font-semibold transition hover:text-[#008C55]"
          >
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAFAF8]">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-7 text-sm text-[#777C74] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>

          <a
            href="#minimal-home"
            className="transition hover:text-[#008C55]"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}

export default MinimalTemplate;
