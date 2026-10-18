function ProfessionalTemplate({ data = {} }) {
  const {
    name = "Your Name",
    role = "Software Engineer",
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

  const safeName = typeof name === "string" ? name : "Your Name";
  const safeRole = typeof role === "string" ? role : "Software Engineer";
  const firstName = safeName.trim().split(/\s+/)[0] || "Portfolio";

  const initials =
    safeName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "YN";

  const validProjects = Array.isArray(projects) ? projects : [];
  const validEducation = Array.isArray(education) ? education : [];
  const validExperience = Array.isArray(experience) ? experience : [];

  const validSkills = Array.isArray(skills)
    ? skills
        .map((skill) =>
          typeof skill === "string" ? skill.trim() : skill?.name?.trim() || ""
        )
        .filter(Boolean)
    : typeof skills === "string"
      ? skills.split(",").map((skill) => skill.trim()).filter(Boolean)
      : [];

  const visibleProjects = validProjects.filter(
    (project) => project?.title || project?.name
  );

  const visibleEducation = validEducation.filter(
    (item) =>
      item?.institution ||
      item?.school ||
      item?.university ||
      item?.qualification ||
      item?.degree
  );

  const visibleExperience = validExperience.filter(
    (item) =>
      item?.company ||
      item?.organization ||
      item?.position ||
      item?.role ||
      item?.title
  );

  const hasContact = email || phone || location || website;

  const getWebsiteUrl = (url) => {
    if (!url) return "";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  };

  const linkClass = "transition duration-200 hover:text-[#2563EB]";

  const sectionLabel =
    "text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]";

  const sectionTitle =
    "mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl";

  const containerClass =
    "mx-auto max-w-7xl px-6 sm:px-10 lg:px-12";

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#17243A]">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-[#17243A]/10 bg-white/95 backdrop-blur">
        <nav
          className={`${containerClass} flex flex-wrap items-center justify-between gap-6 py-6`}
        >
          <a
            href="#professional-home"
            className="text-xl font-extrabold tracking-tight"
          >
            {firstName}
            <span className="text-[#2563EB]">.</span>
          </a>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#5B6678] sm:gap-x-8">
            {about && (
              <a href="#professional-about" className={linkClass}>
                About
              </a>
            )}

            {visibleProjects.length > 0 && (
              <a href="#professional-work" className={linkClass}>
                Projects
              </a>
            )}

            {visibleEducation.length > 0 && (
              <a href="#professional-education" className={linkClass}>
                Education
              </a>
            )}

            {visibleExperience.length > 0 && (
              <a href="#professional-experience" className={linkClass}>
                Experience
              </a>
            )}

            {validSkills.length > 0 && (
              <a href="#professional-skills" className={linkClass}>
                Skills
              </a>
            )}

            {hasContact && (
              <a href="#professional-contact" className={linkClass}>
                Contact
              </a>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="professional-home"
        className="relative scroll-mt-24 overflow-hidden bg-white"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#2563EB]/[0.07] blur-3xl" />

        <div
          className={`${containerClass} relative grid gap-16 py-28 sm:py-36 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-24 lg:py-40`}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/15 bg-[#2563EB]/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              <span className="size-2 rounded-full bg-[#2563EB]" />
              Professional portfolio
            </div>

            <p className="mt-10 text-sm font-medium text-[#5B6678]">
              Hello, I'm {safeName}.
            </p>

            <p className="mt-3 font-semibold text-[#2563EB]">{safeRole}</p>

            <h1 className="mt-6 max-w-4xl whitespace-pre-line text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              {headline.trim() || (
                <>
                  Building solutions.
                  <span className="mt-3 block text-[#2563EB]">
                    Creating impact.
                  </span>
                </>
              )}
            </h1>

            {about && (
              <p className="mt-8 max-w-2xl whitespace-pre-line text-lg leading-9 text-[#5B6678]">
                {about}
              </p>
            )}

            <div className="mt-12 flex flex-wrap gap-5">
              {visibleProjects.length > 0 && (
                <a
                  href="#professional-work"
                  className="inline-flex items-center gap-3 rounded-lg bg-[#2563EB] px-7 py-4 font-semibold text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-1 hover:bg-[#1D4ED8]"
                >
                  View projects <span aria-hidden="true">↗</span>
                </a>
              )}

              {hasContact && (
                <a
                  href="#professional-contact"
                  className="inline-flex items-center gap-3 rounded-lg border border-[#D6DDE8] px-7 py-4 font-semibold transition hover:border-[#2563EB] hover:text-[#2563EB]"
                >
                  Contact me
                </a>
              )}
            </div>
          </div>

          {/* Profile card */}
          <aside className="rounded-3xl border border-[#E0E6EF] bg-[#F7F9FC] p-8 sm:p-10 lg:p-12">
            <p className={sectionLabel}>Profile</p>

            <div className="mt-9 flex size-20 items-center justify-center rounded-2xl bg-[#17243A] text-2xl font-bold text-white">
              {initials}
            </div>

            <h2 className="mt-7 break-words text-2xl font-bold">
              {safeName}
            </h2>

            <p className="mt-3 text-lg text-[#5B6678]">{safeRole}</p>

            {location && (
              <p className="mt-5 text-sm text-[#5B6678]">
                <span className="mr-2 text-[#2563EB]">●</span>
                {location}
              </p>
            )}

            <div className="mt-8 border-t border-[#D6DDE8] pt-6">
              <p className="text-sm leading-8 text-[#5B6678]">
                {about ||
                  "Focused on quality, collaboration, and continuous learning."}
              </p>
            </div>

            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-6 inline-block break-all text-sm font-semibold text-[#2563EB] hover:underline"
              >
                {email}
              </a>
            )}
          </aside>
        </div>
      </section>

      {/* About */}
      {about && (
        <section
          id="professional-about"
          className="scroll-mt-24 border-y border-[#E0E6EF] bg-[#F7F9FC]"
        >
          <div
            className={`${containerClass} grid gap-10 py-24 sm:py-28 md:grid-cols-[0.8fr_1.2fr] lg:gap-20`}
          >
            <div>
              <p className={sectionLabel}>About me</p>
              <h2 className={sectionTitle}>Professional summary</h2>
            </div>

            <p className="whitespace-pre-line text-lg leading-9 text-[#5B6678]">
              {about}
            </p>
          </div>
        </section>
      )}

      {/* Projects */}
      {visibleProjects.length > 0 && (
        <section
          id="professional-work"
          className={`${containerClass} scroll-mt-24 py-28 sm:py-36`}
        >
          <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className={sectionLabel}>Portfolio</p>
              <h2 className={sectionTitle}>Selected projects</h2>
              <p className="mt-4 max-w-xl leading-7 text-[#5B6678]">
                A selection of projects showcasing my skills, technologies,
                and approach to solving problems.
              </p>
            </div>

            <span className="text-sm font-medium text-[#5B6678]">
              {String(visibleProjects.length).padStart(2, "0")} projects
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {visibleProjects.map((project, index) => {
              const technologies = Array.isArray(project.technologies)
                ? project.technologies
                : typeof project.technologies === "string"
                  ? project.technologies.split(",").map((item) => item.trim())
                  : [];

              return (
                <article
                  key={project.id ?? index}
                  className="group rounded-2xl border border-[#E0E6EF] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-xl hover:shadow-blue-900/[0.05] sm:p-10 lg:p-12"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#2563EB]">
                      PROJECT {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xl transition group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </div>

                  <h3 className="mt-8 break-words text-2xl font-bold tracking-tight sm:text-3xl">
                    {project.title || project.name}
                  </h3>

                  {project.description && (
                    <p className="mt-4 whitespace-pre-line leading-8 text-[#5B6678]">
                      {project.description}
                    </p>
                  )}

                  {technologies.length > 0 && (
                    <div className="mt-7 flex flex-wrap gap-2">
                      {technologies.filter(Boolean).map((technology, techIndex) => (
                        <span
                          key={`${technology}-${techIndex}`}
                          className="rounded-full bg-[#2563EB]/[0.07] px-3 py-2 text-xs font-semibold text-[#2563EB]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  )}

                  {(project.github_url ||
                    project.githubUrl ||
                    project.live_url ||
                    project.liveUrl) && (
                    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 border-t border-[#E0E6EF] pt-6 text-sm font-semibold">
                      {(project.github_url || project.githubUrl) && (
                        <a
                          href={getWebsiteUrl(
                            project.github_url || project.githubUrl
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#17243A] underline underline-offset-4 transition hover:text-[#2563EB]"
                        >
                          GitHub ↗
                        </a>
                      )}

                      {(project.live_url || project.liveUrl) && (
                        <a
                          href={getWebsiteUrl(
                            project.live_url || project.liveUrl
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#2563EB] underline underline-offset-4"
                        >
                          Live project ↗
                        </a>
                      )}
                    </div>
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
          id="professional-education"
          className="scroll-mt-24 border-y border-[#E0E6EF] bg-white"
        >
          <div className={`${containerClass} py-24 sm:py-32`}>
            <p className={sectionLabel}>Academic background</p>
            <h2 className={sectionTitle}>Education</h2>

            <div className="mt-12 divide-y divide-[#E0E6EF] border-y border-[#E0E6EF]">
              {visibleEducation.map((item, index) => (
                <article
                  key={item.id ?? index}
                  className="flex flex-col justify-between gap-5 py-10 sm:flex-row sm:gap-10"
                >
                  <div>
                    <h3 className="text-xl font-bold">
                      {item.qualification ||
                        item.degree ||
                        item.title ||
                        "Qualification"}
                    </h3>

                    {(item.institution || item.school || item.university) && (
                      <p className="mt-3 text-lg text-[#5B6678]">
                        {item.institution || item.school || item.university}
                      </p>
                    )}

                    {(item.field || item.field_of_study) && (
                      <p className="mt-2 text-sm text-[#5B6678]">
                        {item.field || item.field_of_study}
                      </p>
                    )}

                    {(item.description || item.details) && (
                      <p className="mt-4 whitespace-pre-line leading-8 text-[#5B6678]">
                        {item.description || item.details}
                      </p>
                    )}
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-[#2563EB]">
                    {[item.startDate || item.start_date, item.endDate || item.end_date]
                      .filter(Boolean)
                      .join(" – ")}
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
          id="professional-experience"
          className={`${containerClass} scroll-mt-24 py-24 sm:py-32`}
        >
          <p className={sectionLabel}>Professional journey</p>
          <h2 className={sectionTitle}>Experience</h2>

          <div className="mt-12 divide-y divide-[#E0E6EF] border-y border-[#E0E6EF]">
            {visibleExperience.map((item, index) => (
              <article key={item.id ?? index} className="py-10">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <h3 className="text-xl font-bold">
                      {item.position || item.role || item.title || "Position"}
                    </h3>

                    {(item.company || item.organization) && (
                      <p className="mt-3 text-lg text-[#5B6678]">
                        {item.company || item.organization}
                      </p>
                    )}
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-[#2563EB]">
                    {[
                      item.startDate || item.start_date,
                      item.endDate ||
                        item.end_date ||
                        (item.current ? "Present" : ""),
                    ]
                      .filter(Boolean)
                      .join(" – ")}
                  </p>
                </div>

                {(item.description || item.details) && (
                  <p className="mt-5 max-w-4xl whitespace-pre-line leading-8 text-[#5B6678]">
                    {item.description || item.details}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {validSkills.length > 0 && (
        <section
          id="professional-skills"
          className="scroll-mt-24 border-y border-[#E0E6EF] bg-white"
        >
          <div className={`${containerClass} py-24 sm:py-32`}>
            <p className={sectionLabel}>Technical expertise</p>
            <h2 className={sectionTitle}>Skills & tools</h2>

            <p className="mt-4 max-w-xl leading-7 text-[#5B6678]">
              Technologies and tools I use to build, improve, and maintain
              digital products.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {validSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-xl border border-[#2563EB]/20 bg-[#F7F9FC] px-5 py-3 text-sm font-semibold text-[#234A91] transition hover:border-[#2563EB]/50 hover:bg-[#2563EB]/[0.05]"
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
        <section
          id="professional-contact"
          className="scroll-mt-24 bg-[#17243A] text-white"
        >
          <div
            className={`${containerClass} flex flex-col gap-12 py-24 sm:py-32 md:flex-row md:items-center md:justify-between`}
          >
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#93B4FF]">
                Let's connect
              </p>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Ready for the next opportunity.
              </h2>

              <p className="mt-6 max-w-2xl leading-8 text-[#C4CDDC]">
                Let's discuss ideas, solve problems, and build something
                valuable.
              </p>

              <div className="mt-10 space-y-5 text-sm sm:text-base">
                {email && (
                  <p>
                    <span className="text-[#C4CDDC]">Email: </span>
                    <a
                      href={`mailto:${email}`}
                      className="break-all font-semibold text-[#93B4FF] hover:underline"
                    >
                      {email}
                    </a>
                  </p>
                )}

                {phone && (
                  <p>
                    <span className="text-[#C4CDDC]">Phone: </span>
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="font-semibold text-white hover:text-[#93B4FF]"
                    >
                      {phone}
                    </a>
                  </p>
                )}

                {location && (
                  <p className="text-[#C4CDDC]">Location: {location}</p>
                )}

                {website && (
                  <p>
                    <span className="text-[#C4CDDC]">Website: </span>
                    <a
                      href={getWebsiteUrl(website)}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all font-semibold text-[#93B4FF] hover:underline"
                    >
                      {website} ↗
                    </a>
                  </p>
                )}
              </div>
            </div>

            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex w-fit shrink-0 items-center gap-3 rounded-lg bg-white px-7 py-4 font-semibold text-[#17243A] transition hover:bg-[#93B4FF]"
              >
                Get in touch <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#17243A] px-6 pb-8 text-sm text-[#C4CDDC] sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {safeName}. All rights reserved.
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