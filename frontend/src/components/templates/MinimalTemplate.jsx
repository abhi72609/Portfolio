function MinimalTemplate({ data = {} }) {
  const {
    name = "Your Name",
    role = "Developer",
    headline = "",
    about = "",
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
        typeof skill === "string"
          ? skill.trim()
          : skill?.name?.trim() || ""
      )
      .filter(Boolean)
    : typeof skills === "string"
      ? skills.split(",").map((skill) => skill.trim()).filter(Boolean)
      : [];

  const hasContact = email || phone || location || website;

  const sectionHeading =
    "text-xs font-bold uppercase tracking-[0.2em] text-[#008C55]";

  const sectionTitle =
    "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl";

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

          <div className="flex flex-wrap gap-3 text-sm text-[#666B64] sm:gap-6">
            <a href="#minimal-about" className="transition hover:text-[#008C55]">
              About
            </a>
            {visibleProjects.length > 0 && (
              <a href="#minimal-work" className="transition hover:text-[#008C55]">
                Work
              </a>
            )}
            {visibleEducation.length > 0 && (
              <a href="#minimal-education" className="transition hover:text-[#008C55]">
                Education
              </a>
            )}
            {visibleExperience.length > 0 && (
              <a href="#minimal-experience" className="transition hover:text-[#008C55]">
                Experience
              </a>
            )}
            {visibleSkills.length > 0 && (
              <a href="#minimal-skills" className="transition hover:text-[#008C55]">
                Skills
              </a>
            )}
            {hasContact && (
              <a href="#minimal-contact" className="transition hover:text-[#008C55]">
                Contact
              </a>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="minimal-home"
        className="mx-auto max-w-5xl px-6 py-24 sm:py-36"
      >
        <p className="mb-6 text-sm font-medium text-[#008C55]">
          Hello, I'm {name}.
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.1] tracking-tight sm:text-7xl">
          {headline.trim() ? (
            <span>{headline}</span>
          ) : (
            <>
              Building
              <span className="block text-[#858A82]">meaningful things.</span>
            </>
          )}
        </h1>

        {about && (
          <p className="mt-8 max-w-2xl whitespace-pre-line text-lg leading-8 text-[#666B64]">
            {about}
          </p>
        )}

        <div className="mt-9 flex flex-wrap items-center gap-6">
          {visibleProjects.length > 0 && (
            <a
              href="#minimal-work"
              className="inline-flex items-center gap-2 rounded-full bg-[#20231F] px-6 py-3 font-medium text-white transition hover:bg-[#008C55]"
            >
              View my work <span aria-hidden="true">↗</span>
            </a>
          )}

          <span className="text-sm text-[#777C74]">{role}</span>
        </div>
      </section>

      {/* About */}
      {about && (
        <section
          id="minimal-about"
          className="border-y border-[#20231F]/10 bg-white"
        >
          <div className="mx-auto grid max-w-5xl gap-5 px-6 py-12 sm:grid-cols-[180px_1fr]">
            <p className={sectionHeading}>A little about me</p>
            <p className="max-w-2xl whitespace-pre-line text-lg leading-8 text-[#555B53]">
              {about}
            </p>
          </div>
        </section>
      )}

      {/* Projects */}
      {visibleProjects.length > 0 && (
        <section
          id="minimal-work"
          className="mx-auto max-w-5xl px-6 py-20 sm:py-28"
        >
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={sectionHeading}>Selected work</p>
              <h2 className={sectionTitle}>A few things I've made.</h2>
            </div>

            <span className="text-sm text-[#777C74]">
              {String(visibleProjects.length).padStart(2, "0")} projects
            </span>
          </div>

          <div className="divide-y divide-[#20231F]/10 border-y border-[#20231F]/10">
            {visibleProjects.map((project, index) => {
              const projectUrl = project.live_url || project.liveUrl;
              const technologies = Array.isArray(project.technologies)
                ? project.technologies.join(" · ")
                : project.technologies || "";

              return (
                <article
                  key={project.id ?? index}
                  className="grid gap-3 py-7 sm:grid-cols-[64px_1fr_auto] sm:items-center"
                >
                  <span className="text-sm tabular-nums text-[#008C55]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {project.title || project.name}
                    </h3>

                    {project.description && (
                      <p className="mt-2 whitespace-pre-line leading-7 text-[#666B64]">
                        {project.description}
                      </p>
                    )}

                    {technologies && (
                      <p className="mt-3 text-sm text-[#008C55]">
                        {technologies}
                      </p>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 mr-4 inline-block text-sm underline underline-offset-4 hover:text-[#008C55]"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {projectUrl && (
                      <a
                        href={projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-[#008C55]"
                      >
                        Live project ↗
                      </a>
                    )}
                  </div>

                  {projectUrl && (
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title || project.name}`}
                      className="text-lg text-[#008C55] transition hover:translate-x-1"
                    >
                      ↗
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Education */}
      {visibleEducation.length > 0 && (
        <section
          id="minimal-education"
          className="border-y border-[#20231F]/10 bg-white"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <p className={sectionHeading}>Academic background</p>
            <h2 className={sectionTitle}>Education</h2>

            <div className="mt-10 divide-y divide-[#20231F]/10 border-y border-[#20231F]/10">
              {visibleEducation.map((item, index) => (
                <article key={item.id ?? index} className="py-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {item.qualification ||
                          item.degree ||
                          item.title ||
                          "Qualification"}
                      </h3>

                      <p className="mt-2 text-[#666B64]">
                        {item.institution || item.school || item.university || ""}
                      </p>

                      {(item.field || item.field_of_study) && (
                        <p className="mt-1 text-sm text-[#666B64]">
                          {item.field || item.field_of_study}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-[#008C55]">
                      {[item.start_date || item.startDate, item.end_date || item.endDate]
                        .filter(Boolean)
                        .join(" – ")}
                    </p>
                  </div>

                  {(item.details || item.description) && (
                    <p className="mt-4 whitespace-pre-line leading-7 text-[#666B64]">
                      {item.details || item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {visibleExperience.length > 0 && (
        <section id="minimal-experience" className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <p className={sectionHeading}>Professional journey</p>
          <h2 className={sectionTitle}>Work experience</h2>

          <div className="mt-10 divide-y divide-[#20231F]/10 border-y border-[#20231F]/10">
            {visibleExperience.map((item, index) => (
              <article key={item.id ?? index} className="py-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.position || item.role || item.title || "Position"}
                    </h3>

                    <p className="mt-2 text-[#666B64]">
                      {item.company || item.organization || ""}
                    </p>
                  </div>

                  <p className="text-sm text-[#008C55]">
                    {[
                      item.start_date || item.startDate,
                      item.end_date || item.endDate || (item.current ? "Present" : ""),
                    ]
                      .filter(Boolean)
                      .join(" – ")}
                  </p>
                </div>

                {(item.description || item.details) && (
                  <p className="mt-4 whitespace-pre-line leading-7 text-[#666B64]">
                    {item.description || item.details}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {visibleSkills.length > 0 && (
        <section
          id="minimal-skills"
          className="border-y border-[#20231F]/10 bg-white"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <p className={sectionHeading}>What I work with</p>
            <h2 className={sectionTitle}>Skills & tools</h2>

            <div className="mt-8 flex flex-wrap gap-3">
              {visibleSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-[#008C55]/25 px-4 py-2 text-sm font-medium text-[#246348]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      {hasContact && (
        <section id="minimal-contact" className="bg-[#ECEEE9]">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className={sectionHeading}>Get in touch</p>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Let's connect.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-[#666B64]">
              Interested in working together? Reach out using the details below.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="border-b border-[#008C55] pb-1 font-semibold transition hover:text-[#008C55]"
                >
                  {email} ↗
                </a>
              )}

              {phone && (
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="transition hover:text-[#008C55]"
                >
                  {phone}
                </a>
              )}

              {location && <p className="text-[#666B64]">{location}</p>}

              {website && (
                <a
                  href={/^https?:\/\//i.test(website) ? website : `https://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-[#008C55] pb-1 font-semibold transition hover:text-[#008C55]"
                >
                  {website} ↗
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#FAFAF8]">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-7 text-sm text-[#777C74] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>

          <a href="#minimal-home" className="transition hover:text-[#008C55]">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}

export default MinimalTemplate;
