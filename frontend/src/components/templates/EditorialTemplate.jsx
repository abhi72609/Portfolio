
function EditorialTemplate({ data = {} }) {
  const {
    name = "Alex Morgan",
    role = "Writer & Researcher",
    about = "I explore ideas, tell thoughtful stories, and turn complex subjects into clear, meaningful work.",
    projects = [],
  } = data;

  const firstName = name.split(" ")[0];

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#20251F]">
      {/* Navigation */}
      <header className="border-b border-[#20251F]/15">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <a href="#editorial-home" className="font-serif text-2xl font-bold tracking-tight">
            {firstName}
            <span className="text-[#527B5D]">.</span>
          </a>

          <div className="flex gap-4 text-xs font-semibold uppercase tracking-widest sm:gap-7">
            <a href="#editorial-about" className="transition hover:text-[#527B5D]">
              About
            </a>
            <a href="#editorial-work" className="transition hover:text-[#527B5D]">
              Writing
            </a>
            <a href="#editorial-contact" className="transition hover:text-[#527B5D]">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="editorial-home" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid gap-12 md:grid-cols-[1.5fr_0.7fr] md:items-end">
          <div>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-[#527B5D]">
              Independent voice · Thoughtful perspective
            </p>

            <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
              Ideas worth
              <br />
              <span className="italic text-[#527B5D]">exploring.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#555B52]">
              {about}
            </p>

            <a
              href="#editorial-work"
              className="mt-9 inline-flex items-center gap-3 border-b-2 border-[#527B5D] pb-2 font-semibold transition hover:gap-5"
            >
              Discover my work <span aria-hidden="true">↗</span>
            </a>
          </div>

          <aside className="border-l border-[#20251F]/20 pl-6 md:pb-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#527B5D]">
              A little introduction
            </p>
            <p className="mt-4 font-serif text-2xl leading-relaxed">
              Words, research, and stories with a purpose.
            </p>
            <p className="mt-4 text-sm text-[#555B52]">{role}</p>
          </aside>
        </div>
      </section>

      {/* About */}
      <section
        id="editorial-about"
        className="border-y border-[#20251F]/15 bg-[#EAE5DA]"
      >
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-3">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#527B5D]">
            The perspective
          </p>
          <p className="font-serif text-xl leading-8 sm:col-span-2">
            I believe the best work begins with curiosity, grows through
            careful thought, and ends with something worth sharing.
          </p>
        </div>
      </section>

      {/* Selected work */}
      <section id="editorial-work" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#527B5D]">
              The archive
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">
              Selected writing
            </h2>
          </div>
          <span className="text-sm text-[#555B52]">
            {String(projects.length).padStart(2, "0")} entries
          </span>
        </div>

        {projects.length > 0 ? (
          <div className="divide-y divide-[#20251F]/15 border-y border-[#20251F]/15">
            {projects.map((project, index) => (
              <article
                key={project.id ?? index}
                className="group grid gap-4 py-8 transition-colors sm:grid-cols-[80px_1fr_auto] sm:items-start"
              >
                <span className="pt-1 font-serif text-lg italic text-[#527B5D]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-serif text-2xl font-bold transition-colors group-hover:text-[#527B5D] sm:text-3xl">
                    {project.title ?? project.name ?? `Article ${index + 1}`}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-7 text-[#555B52]">
                    {project.description ?? "A story from my collection of work."}
                  </p>
                </div>

                <span className="text-xl transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="border-y border-[#20251F]/15 py-12">
            <p className="font-serif text-2xl font-bold">Stories to come.</p>
            <p className="mt-3 text-[#555B52]">
              Add your writing and projects to populate this collection.
            </p>
          </div>
        )}
      </section>

      {/* Contact */}
      <section
        id="editorial-contact"
        className="bg-[#20251F] text-[#F5F1E8]"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:flex-row sm:items-end sm:justify-between sm:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#A8C5A8]">
              Continue the conversation
            </p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl font-bold sm:text-6xl">
              Every good story starts somewhere.
            </h2>
          </div>

          <a
            href="mailto:hello@example.com"
            className="inline-flex w-fit shrink-0 items-center gap-3 border border-[#A8C5A8]/50 px-5 py-3 font-semibold transition hover:bg-[#A8C5A8] hover:text-[#20251F]"
          >
            Get in touch ↗
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#20251F] px-6 pb-8 text-sm text-[#C5C8BE]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <a href="#editorial-home" className="transition hover:text-white">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}

export default EditorialTemplate;
