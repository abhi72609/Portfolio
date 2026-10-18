
function DarkTemplate({ data = {} }) {
  const {
    name = "Alex Morgan",
    role = "Full-Stack Developer",
    headline = "",
    about = "I build powerful digital experiences with clean code, thoughtful design, and modern technology.",
    email = "",
    phone = "",
    location = "",
    website = "",
    projects = [],
    education = [],
    experience = [],
    skills = [],
  } = data;

  const firstName = name.trim().split(/\s+/)[0] || "Portfolio";

  const visibleProjects = projects.filter(
    (project) => project.title || project.name
  );

  const visibleEducation = education.filter(
    (item) =>
      item.institution ||
      item.school ||
      item.qualification ||
      item.degree
  );

  const visibleExperience = experience.filter(
    (item) =>
      item.company ||
      item.organization ||
      item.position ||
      item.role ||
      item.title
  );

  const visibleSkills = Array.isArray(skills)
    ? skills
        .map((skill) =>
          typeof skill === "string" ? skill.trim() : skill?.name?.trim() || ""
        )
        .filter(Boolean)
    : typeof skills === "string"
      ? skills.split(",").map((skill) => skill.trim()).filter(Boolean)
      : [];

  const hasContact = email || phone || location || website;

  const sectionLabel =
    "text-xs font-bold uppercase tracking-[0.25em] text-[#00E68A]";

  const sectionHeading =
    "mt-4 text-3xl font-bold tracking-tight sm:text-5xl";

  const muted = "text-[#A4B0A8]";

  const getPeriod = (item) =>
    [
      item.startDate || item.start_date,
      item.endDate || item.end_date || (item.current ? "Present" : ""),
    ]
      .filter(Boolean)
      .join(" – ");

  const getWebsiteUrl = (url) =>
    /^https?:\/\//i.test(url) ? url : `https://${url}`;

  return (
    <main className="min-h-screen overflow-hidden bg-[#070908] text-[#F4F7F4]">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#070908]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5 sm:px-10 lg:px-16">
          <a
            href="#dark-home"
            className="shrink-0 text-xl font-black tracking-tight"
          >
            {firstName}
            <span className="text-[#00E68A]">.</span>
          </a>

          <div className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-xs text-[#A4B0A8] sm:gap-x-6 sm:text-sm">
            <a href="#dark-about" className="transition hover:text-[#00E68A]">
              About
            </a>

            {visibleProjects.length > 0 && (
              <a href="#dark-work" className="transition hover:text-[#00E68A]">
                Projects
              </a>
            )}

            {visibleEducation.length > 0 && (
              <a href="#dark-education" className="transition hover:text-[#00E68A]">
                Education
              </a>
            )}

            {visibleExperience.length > 0 && (
              <a href="#dark-experience" className="transition hover:text-[#00E68A]">
                Experience
              </a>
            )}

            {visibleSkills.length > 0 && (
              <a href="#dark-skills" className="transition hover:text-[#00E68A]">
                Skills
              </a>
            )}

            {hasContact && (
              <a href="#dark-contact" className="transition hover:text-[#00E68A]">
                Contact
              </a>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="dark-home"
        className="relative isolate border-b border-white/[0.08]"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_30%,rgba(0,200,117,0.15),transparent_48%)]" />

        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-36 lg:px-16 lg:py-44">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#00C875]/30 bg-[#00C875]/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8AFFC1]">
            <span className="size-2 rounded-full bg-[#00E68A]" />
            Available for opportunities
          </div>

          <p className="mt-10 text-sm font-medium text-[#A4B0A8]">
            Hello, I'm {name}
          </p>

          <p className="mt-3 text-base font-semibold text-[#8AFFC1]">
            {role}
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl lg:text-8xl">
            {headline.trim() ? (
              headline
            ) : (
              <>
                Building digital
                <span className="mt-2 block text-[#00E68A]">
                  things that matter.
                </span>
              </>
            )}
          </h1>

          {about && (
            <p className={`mt-9 max-w-2xl whitespace-pre-line text-base leading-8 sm:text-lg sm:leading-9 ${muted}`}>
              {about}
            </p>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            {visibleProjects.length > 0 && (
              <a
                href="#dark-work"
                className="inline-flex items-center gap-3 rounded-lg bg-[#00C875] px-6 py-4 font-bold text-[#041109] transition hover:-translate-y-1 hover:bg-[#00E68A]"
              >
                Explore projects <span aria-hidden="true">↘</span>
              </a>
            )}

            {hasContact && (
              <a
                href="#dark-contact"
                className="inline-flex items-center gap-3 rounded-lg border border-white/15 px-6 py-4 font-semibold transition hover:border-[#00C875] hover:text-[#8AFFC1]"
              >
                Get in touch <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          <div className="mt-20 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-8">
            {[
              { label: "Focus", value: role },
              { label: "Approach", value: "User-first" },
              { label: "Mindset", value: "Always learning" },
            ].map((item) => (
              <div key={item.label} className="py-2">
                <p className={`text-sm ${muted}`}>{item.label}</p>
                <p className="mt-3 text-base font-semibold sm:text-lg">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="dark-about"
        className="border-b border-white/[0.08] bg-[#0A0E0B]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 sm:px-10 sm:py-32 md:grid-cols-[0.8fr_1.2fr] md:gap-20 lg:px-16">
          <div>
            <p className={sectionLabel}>About me</p>

            <h2 className={sectionHeading}>
              Thoughtful work.
              <span className="mt-2 block text-[#A4B0A8]">
                Meaningful impact.
              </span>
            </h2>
          </div>

          <div className="md:pt-8">
            <p className="text-lg font-semibold text-[#8AFFC1]">{role}</p>

            <p className={`mt-5 whitespace-pre-line text-base leading-8 sm:text-lg sm:leading-9 ${muted}`}>
              {about}
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="dark-work"
        className="border-b border-white/[0.08] bg-[#0B100D]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5 sm:mb-16">
            <div>
              <p className={sectionLabel}>Selected work</p>
              <h2 className={sectionHeading}>Featured projects.</h2>
            </div>

            <span className={`text-sm ${muted}`}>
              {String(visibleProjects.length).padStart(2, "0")} projects
            </span>
          </div>

          {visibleProjects.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {visibleProjects.map((project, index) => (
                <article
                  key={project.id ?? index}
                  className="group rounded-2xl border border-white/10 bg-[#111713] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#00C875]/60 sm:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#00E68A]">
                      PROJECT / {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xl text-[#8AFFC1] transition group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <h3 className="mt-9 text-2xl font-bold sm:text-3xl">
                    {project.title || project.name || `Project ${index + 1}`}
                  </h3>

                  {project.description && (
                    <p className={`mt-4 whitespace-pre-line leading-8 ${muted}`}>
                      {project.description}
                    </p>
                  )}

                  {project.technologies && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {(Array.isArray(project.technologies)
                        ? project.technologies
                        : project.technologies.split(",")
                      ).map((technology, techIndex) => (
                        <span
                          key={`${technology}-${techIndex}`}
                          className="rounded-full border border-[#00C875]/25 px-3 py-1.5 text-xs text-[#8AFFC1]"
                        >
                          {technology.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-[#8AFFC1]"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {(project.live_url || project.liveUrl) && (
                      <a
                        href={project.live_url || project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#8AFFC1] transition hover:text-white"
                      >
                        Live project ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center sm:py-20">
              <p className="text-xl font-semibold">Projects coming soon.</p>
              <p className={`mt-3 ${muted}`}>
                Add projects to showcase your work here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Education */}
      {visibleEducation.length > 0 && (
        <section
          id="dark-education"
          className="border-b border-white/[0.08]"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
            <p className={sectionLabel}>Learning & growth</p>
            <h2 className={sectionHeading}>Education.</h2>

            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {visibleEducation.map((item, index) => (
                <article
                  key={item.id ?? index}
                  className="grid gap-4 py-8 sm:grid-cols-[1fr_auto] sm:gap-10 sm:py-10"
                >
                  <div>
                    <h3 className="text-xl font-semibold sm:text-2xl">
                      {item.qualification || item.degree || item.title || "Qualification"}
                    </h3>

                    <p className={`mt-3 ${muted}`}>
                      {item.institution || item.school || item.university || ""}
                    </p>

                    {(item.field || item.field_of_study) && (
                      <p className="mt-2 text-sm text-[#8AFFC1]">
                        {item.field || item.field_of_study}
                      </p>
                    )}

                    {(item.description || item.details) && (
                      <p className={`mt-4 max-w-3xl whitespace-pre-line leading-7 ${muted}`}>
                        {item.description || item.details}
                      </p>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-[#8AFFC1]">
                    {getPeriod(item)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {visibleExperience.length > 0 && (
        <section
          id="dark-experience"
          className="border-b border-white/[0.08] bg-[#0A0E0B]"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
            <p className={sectionLabel}>Professional journey</p>
            <h2 className={sectionHeading}>Experience.</h2>

            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {visibleExperience.map((item, index) => (
                <article
                  key={item.id ?? index}
                  className="grid gap-4 py-8 sm:grid-cols-[1fr_auto] sm:gap-10 sm:py-10"
                >
                  <div>
                    <h3 className="text-xl font-semibold sm:text-2xl">
                      {item.position || item.role || item.title || "Position"}
                    </h3>

                    <p className="mt-3 text-[#8AFFC1]">
                      {item.company || item.organization || ""}
                    </p>

                    {(item.description || item.details) && (
                      <p className={`mt-4 max-w-3xl whitespace-pre-line leading-8 ${muted}`}>
                        {item.description || item.details}
                      </p>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-[#8AFFC1]">
                    {getPeriod(item)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {visibleSkills.length > 0 && (
        <section
          id="dark-skills"
          className="border-b border-white/[0.08]"
        >
          <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
            <p className={sectionLabel}>Technical expertise</p>
            <h2 className={sectionHeading}>Skills & technologies.</h2>

            <p className={`mt-5 max-w-2xl leading-8 ${muted}`}>
              Tools and technologies I use to turn ideas into practical digital experiences.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {visibleSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-[#00C875]/30 bg-[#00C875]/[0.06] px-5 py-3 text-sm font-medium text-[#B8FFD9]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="dark-contact" className="bg-[#0B100D]">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <div className="rounded-3xl border border-[#00C875]/25 bg-[radial-gradient(ellipse_at_top,rgba(0,200,117,0.12),transparent_65%)] px-7 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <p className={sectionLabel}>Let's connect</p>

            <div className="mt-6 grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
              <div>
                <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                  Have an interesting project in mind?
                </h2>

                <p className={`mt-6 max-w-xl leading-8 ${muted}`}>
                  I'm always interested in discussing new ideas, collaborations, and opportunities.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 text-sm">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-[#8AFFC1] transition hover:text-white"
                  >
                    {email} ↗
                  </a>
                )}

                {phone && (
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="transition hover:text-[#8AFFC1]"
                  >
                    {phone}
                  </a>
                )}

                {location && <p className={muted}>{location}</p>}

                {website && (
                  <a
                    href={getWebsiteUrl(website)}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-[#8AFFC1]"
                  >
                    Visit website ↗
                  </a>
                )}

                {!hasContact && (
                  <a
                    href="mailto:hello@example.com"
                    className="rounded-lg bg-[#00C875] px-6 py-4 font-bold text-[#041109] transition hover:bg-[#00E68A]"
                  >
                    Say hello ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#A4B0A8] sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
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