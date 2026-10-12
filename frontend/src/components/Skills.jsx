
const skillGroups = [
  {
    number: '01',
    title: 'Frontend Development',
    description: 'Building responsive and accessible user interfaces.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    number: '02',
    title: 'Backend Development',
    description: 'Developing APIs and application logic.',
    skills: ['Python', 'FastAPI', 'Java', 'Spring Boot'],
  },
  {
    number: '03',
    title: 'Database Management',
    description: 'Designing data structures and writing queries.',
    skills: ['MySQL', 'SQL', 'Database Design'],
  },
  {
    number: '04',
    title: 'Tools & Workflow',
    description: 'Managing code and collaborating on projects.',
    skills: ['Git', 'GitHub', 'VS Code', 'REST APIs'],
  },
]

function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-white/10 bg-[#101014] px-6 py-24 text-white sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
          My Toolkit
        </p>

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            Skills that bring
            <span className="block text-zinc-500">ideas to life.</span>
          </h2>

          <p className="max-w-md leading-7 text-zinc-400">
            Technologies I use to build web applications, work with data,
            and develop practical solutions.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.number}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:bg-white/[0.04] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-lime-400">
                  {group.number}
                </span>
                <span className="text-xl text-zinc-600 transition group-hover:text-lime-400">
                  ↗
                </span>
              </div>

              <h3 className="mt-7 text-xl font-semibold">
                {group.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {group.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/10 bg-[#0b0b0e] px-3 py-2 text-xs text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
