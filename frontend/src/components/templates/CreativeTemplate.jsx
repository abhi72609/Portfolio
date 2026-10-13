
function CreativeTemplate({ data = {} }) {
  const {
    name = "Alex Morgan",
    role = "Creative Developer",
    about = "I bring bold ideas to life through design, code, and experimentation.",
    projects = [],
  } = data;

  return (
    <main className="min-h-screen overflow-hidden bg-[#090B0A] text-[#F4F7F4]">
      <header className="border-b border-white/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <a href="#home" className="text-lg font-black tracking-tight">
            {name.split(" ")[0]}
            <span className="text-[#00E68A]">.</span>
          </a>

          <div className="flex gap-5 text-sm text-[#A4B0A8] sm:gap-8">
            <a href="#about" className="transition hover:text-[#8AFFC1]">About</a>
            <a href="#work" className="transition hover:text-[#8AFFC1]">Work</a>
            <a href="#contact" className="transition hover:text-[#8AFFC1]">Contact</a>
          </div>
        </nav>
      </header>

      <section id="home" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="pointer-events-none absolute -right-20 top-12 h-72 w-72 rounded-full bg-[#00C875]/10 blur-[100px]" />

        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[#00E68A]">
          Independent creative portfolio
        </p>

        <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
          Making ideas
          <br />
          <span className="text-[#00E68A]">impossible</span> to ignore.
        </h1>

        <div className="mt-10 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <p className="max-w-xl text-lg leading-8 text-[#A4B0A8]">
            {about}
          </p>

          <a
            href="#work"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-[#00C875] px-6 py-3 font-bold text-[#041109] transition hover:-translate-y-1 hover:bg-[#00E68A]"
          >
            Explore my work <span aria-hidden="true">↘</span>
          </a>
        </div>
      </section>

      <section id="about" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-10 sm:grid-cols-3">
          <p className="text-sm font-bold uppercase tracking-widest text-[#8AFFC1]">
            {name}
          </p>
          <p className="text-sm leading-6 text-[#A4B0A8] sm:col-span-2">
            {role} · Design-minded developer · Creative problem solver
          </p>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#00E68A]">
              Selected work
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Things I've made.
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
                className="group rounded-2xl border border-white/10 bg-[#111713] p-6 transition hover:-translate-y-1 hover:border-[#00C875]/60 sm:p-8"
              >
                <span className="text-sm font-bold text-[#00E68A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-2xl font-bold">
                  {project.title ?? project.name ?? `Project ${index + 1}`}
                </h3>
                <p className="mt-3 leading-7 text-[#A4B0A8]">
                  {project.description ?? "A selected creative project."}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
            <p className="text-lg font-semibold">Your next project goes here.</p>
            <p className="mt-2 text-sm text-[#A4B0A8]">
              Add projects to your portfolio data to showcase your work.
            </p>
          </div>
        )}
      </section>

      <footer id="contact" className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#A4B0A8]">
            © {new Date().getFullYear()} {name}
          </p>
          <a
            href="mailto:hello@example.com"
            className="font-semibold text-[#8AFFC1] transition hover:text-white"
          >
            Let's create something ↗
          </a>
        </div>
      </footer>
    </main>
  );
}

export default CreativeTemplate;
