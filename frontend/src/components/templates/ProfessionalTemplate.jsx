
function ProfessionalTemplate({ data = {} }) {
  const {
    name = "Alex Morgan",
    role = "Software Engineer",
    about = "I build reliable software and turn complex challenges into practical, user-friendly solutions.",
    projects = [],
  } = data;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#17243A]">
      {/* Navigation */}
      <header className="border-b border-[#17243A]/10 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <a
            href="#professional-home"
            className="text-xl font-extrabold tracking-tight"
          >
            {name}
            <span className="text-[#2563EB]">.</span>
          </a>

          <div className="flex gap-4 text-sm font-medium text-[#5B6678] sm:gap-7">
            <a href="#professional-about" className="transition hover:text-[#2563EB]">
              About
            </a>
            <a href="#professional-work" className="transition hover:text-[#2563EB]">
              Projects
            </a>
            <a href="#professional-contact" className="transition hover:text-[#2563EB]">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="professional-home" className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#2563EB]/[0.07] blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-32 md:grid-cols-[1.3fr_0.7fr] md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/15 bg-[#2563EB]/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              <span className="size-2 rounded-full bg-[#2563EB]" />
              Professional portfolio
            </div>

            <p className="mt-8 text-sm font-medium text-[#5B6678]">
              Hello, I'm {name}
            </p>

            <h1 className="mt-4 text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-7xl">
              Building solutions.
              <span className="mt-2 block text-[#2563EB]">
                Creating impact.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5B6678]">
              {about}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#professional-work"
                className="inline-flex items-center gap-3 rounded-lg bg-[#2563EB] px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
              >
                View projects <span aria-hidden="true">↗</span>
              </a>

              <a
                href="#professional-contact"
                className="inline-flex items-center gap-3 rounded-lg border border-[#D6DDE8] px-6 py-3.5 font-semibold transition hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Contact me
              </a>
            </div>
          </div>

          {/* Profile card */}
          <aside className="rounded-2xl border border-[#E0E6EF] bg-[#F7F9FC] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              Profile
            </p>

            <div className="mt-7 flex size-16 items-center justify-center rounded-2xl bg-[#17243A] text-2xl font-bold text-white">
              {initials || "AM"}
            </div>

            <h2 className="mt-5 text-2xl font-bold">{name}</h2>
            <p className="mt-2 text-[#5B6678]">{role}</p>

            <div className="mt-7 border-t border-[#D6DDE8] pt-5">
              <p className="text-sm leading-7 text-[#5B6678]">
                Focused on quality, collaboration, and measurable results.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* About */}
      <section
        id="professional-about"
        className="border-y border-[#E0E6EF] bg-[#F7F9FC]"
      >
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              About me
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Professional summary
            </h2>
          </div>

          <p className="text-lg leading-8 text-[#5B6678]">{about}</p>
        </div>
      </section>

      {/* Projects */}
      <section
        id="professional-work"
        className="mx-auto max-w-6xl px-6 py-24 sm:py-28"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
              Portfolio
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Selected projects
            </h2>
          </div>

          <span className="text-sm text-[#5B6678]">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.id ?? index}
                className="group rounded-2xl border border-[#E0E6EF] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-xl hover:shadow-blue-900/[0.05] sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#2563EB]">
                    PROJECT {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden="true"
                    className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold tracking-tight">
                  {project.title ?? project.name ?? `Project ${index + 1}`}
                </h3>

                <p className="mt-3 leading-7 text-[#5B6678]">
                  {project.description ??
                    "A project demonstrating my skills and experience."}
                </p>

                {project.technologies && (
                  <p className="mt-5 text-sm font-medium text-[#2563EB]">
                    {Array.isArray(project.technologies)
                      ? project.technologies.join(" · ")
                      : project.technologies}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-10">
            <p className="text-lg font-semibold">
              Your projects will appear here.
            </p>
            <p className="mt-2 text-sm text-[#5B6678]">
              Add projects to your portfolio data to showcase your experience.
            </p>
          </div>
        )}
      </section>

      {/* Contact */}
      <section id="professional-contact" className="bg-[#17243A] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:py-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#93B4FF]">
              Let's connect
            </p>

            <h2 className="mt-5 max-w-2xl text-4xl font-extrabold leading-tight sm:text-6xl">
              Ready for the next opportunity.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-[#C4CDDC]">
              Let's discuss ideas, solve problems, and build something valuable.
            </p>
          </div>

          <a
            href="mailto:hello@example.com"
            className="inline-flex w-fit shrink-0 items-center gap-3 rounded-lg bg-white px-6 py-3.5 font-semibold text-[#17243A] transition hover:bg-[#93B4FF]"
          >
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17243A] px-6 pb-8 text-sm text-[#C4CDDC]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>

          <a
            href="#professional-home"
            className="transition hover:text-white"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}

export default ProfessionalTemplate;
