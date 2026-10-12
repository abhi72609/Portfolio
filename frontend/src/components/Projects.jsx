
const projects = [
  {
    number: '01',
    category: 'HEALTHCARE',
    name: 'Mediyog Hospital Website',
    description:
      'A healthcare website designed to help patients explore doctors, departments, and services, with appointment booking features.',
    technologies: ['React', 'FastAPI', 'SQL'],
    accent: 'from-emerald-400/20 to-teal-900/10',
    icon: '✚',
    status: 'Full-stack application',
  },
  {
    number: '02',
    category: 'INVENTORY MANAGEMENT',
    name: 'SmartStock',
    description:
      'An inventory management application focused on organizing stock information and simplifying inventory operations.',
    technologies: ['Frontend', 'Backend', 'Database'],
    accent: 'from-blue-400/20 to-indigo-900/10',
    icon: '▦',
    status: 'Full-stack application',
  },
  {
    number: '03',
    category: 'ONLINE MARKETPLACE',
    name: 'Yantra',
    description:
      'An online painting marketplace project with an artwork-focused interface and a secure login experience.',
    technologies: ['Web Development', 'Authentication'],
    accent: 'from-orange-400/20 to-rose-900/10',
    icon: '◇',
    status: 'Web application',
  },
]

function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-white/10 bg-[#0b0b0e] px-6 py-24 text-white sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
          Selected Work
        </p>

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Projects I've
            <span className="block text-zinc-500">worked on.</span>
          </h2>

          <p className="max-w-md leading-7 text-zinc-400">
            A selection of projects where I've applied my development skills
            to build practical web experiences.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition duration-300 hover:-translate-y-1 hover:border-lime-400/30"
            >
              {/* Project visual */}
              <div
                className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${project.accent}`}
              >
                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

                <span className="absolute left-6 top-5 text-xs tracking-widest text-white/60">
                  PROJECT / {project.number}
                </span>

                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-black/20 text-5xl text-lime-300 shadow-2xl backdrop-blur-sm transition duration-300 group-hover:scale-110">
                  {project.icon}
                </div>

                <span className="absolute bottom-5 right-6 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-xs text-zinc-200 backdrop-blur">
                  {project.status}
                </span>
              </div>

              {/* Project details */}
              <div className="p-6 sm:p-8">
                <p className="text-xs font-medium tracking-[0.2em] text-lime-400">
                  {project.category}
                </p>

                <h3 className="mt-3 text-xl font-semibold sm:text-2xl">
                  {project.name}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className="text-sm text-zinc-500">
                    Project details and links coming soon
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
