function EditorialTemplate({ data = {} }) {
  const {
    name = "Your Name",
    role = "Writer & Researcher",
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
  const safeRole = typeof role === "string" ? role : "Writer & Researcher";
  const firstName = safeName.trim().split(/\s+/)[0] || "Portfolio";

  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeEducation = Array.isArray(education) ? education : [];
  const safeExperience = Array.isArray(experience) ? experience : [];

  const safeSkills = Array.isArray(skills)
    ? skills
        .map((skill) =>
          typeof skill === "string" ? skill.trim() : skill?.name?.trim() || ""
        )
        .filter(Boolean)
    : typeof skills === "string"
      ? skills.split(",").map((skill) => skill.trim()).filter(Boolean)
      : [];

  const validProjects = safeProjects.filter(
    (project) => project?.title || project?.name
  );

  const validEducation = safeEducation.filter(
    (item) =>
      item?.institution ||
      item?.school ||
      item?.qualification ||
      item?.degree
  );

  const validExperience = safeExperience.filter(
    (item) =>
      item?.company ||
      item?.organization ||
      item?.position ||
      item?.title
  );

  const hasContact = email || phone || location || website;

  const container = "mx-auto max-w-7xl px-6 sm:px-10 lg:px-12";

  const labelClass =
    "text-xs font-bold uppercase tracking-[0.25em] text-[#527B5D]";

  const headingClass =
    "mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl";

  const getWebsiteUrl = (url) => {
    if (!url) return "";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F1E8] text-[#20251F]">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-[#20251F]/15 bg-[#F5F1E8]/95 backdrop-blur">
        <nav
          className={`${container} flex flex-wrap items-center justify-between gap-5 py-6`}
        >
          <a
            href="#editorial-home"
            className="font-serif text-2xl font-bold tracking-tight"
          >
            {firstName}
            <span className="text-[#527B5D]">.</span>
          </a>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold uppercase tracking-wider sm:gap-x-7">
            {about && (
              <a
                href="#editorial-about"
                className="transition hover:text-[#527B5D]"
              >
                About
              </a>
            )}

            {validProjects.length > 0 && (
              <a
                href="#editorial-work"
                className="transition hover:text-[#527B5D]"
              >
                Work
              </a>
            )}

            {validEducation.length > 0 && (
              <a
                href="#editorial-education"
                className="transition hover:text-[#527B5D]"
              >
                Education
              </a>
            )}

            {validExperience.length > 0 && (
              <a
                href="#editorial-experience"
                className="transition hover:text-[#527B5D]"
              >
                Experience
              </a>
            )}

            {safeSkills.length > 0 && (
              <a
                href="#editorial-skills"
                className="transition hover:text-[#527B5D]"
              >
                Skills
              </a>
            )}

            {hasContact && (
              <a
                href="#editorial-contact"
                className="transition hover:text-[#527B5D]"
              >
                Contact
              </a>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        id="editorial-home"
        className="scroll-mt-24 border-b border-[#20251F]/10"
      >
        <div className={`${container} py-28 sm:py-36 lg:py-44`}>
          <div className="grid gap-16 lg:grid-cols-[1.5fr_0.6fr] lg:items-end lg:gap-24">
            <div>
              <p className={labelClass}>
                Independent perspective · Personal portfolio
              </p>

              <h1 className="mt-10 max-w-5xl font-serif text-6xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
                {headline.trim() || (
                  <>
                    Ideas worth
                    <br />
                    <span className="italic text-[#527B5D]">
                      exploring.
                    </span>
                  </>
                )}
              </h1>

              {about && (
                <p className="mt-10 max-w-2xl whitespace-pre-line text-lg leading-9 text-[#555B52] sm:text-xl sm:leading-10">
                  {about}
                </p>
              )}

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
                {validProjects.length > 0 && (
                  <a
                    href="#editorial-work"
                    className="inline-flex items-center gap-3 border-b-2 border-[#527B5D] pb-3 font-semibold transition hover:gap-5"
                  >
                    Discover my work <span>↗</span>
                  </a>
                )}

                {hasContact && (
                  <a
                    href="#editorial-contact"
                    className="text-sm font-semibold text-[#527B5D] transition hover:text-[#20251F]"
                  >
                    Get in touch ↗
                  </a>
                )}
              </div>
            </div>

            <aside className="border-l-2 border-[#527B5D]/40 pl-7 lg:pb-3">
              <p className={labelClass}>A little introduction</p>

              <p className="mt-6 font-serif text-2xl leading-relaxed sm:text-3xl">
                {safeName}
              </p>

              <p className="mt-4 text-sm leading-7 text-[#555B52]">
                {safeRole}
              </p>

              {location && (
                <p className="mt-3 text-sm text-[#555B52]">{location}</p>
              )}

              <div className="mt-8 h-px w-16 bg-[#527B5D]" />
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[#777B70]">
                A collection of my work
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* About */}
      {about && (
        <section
          id="editorial-about"
          className="scroll-mt-24 border-b border-[#20251F]/10 bg-[#EAE5DA]"
        >
          <div
            className={`${container} grid gap-8 py-20 sm:py-24 md:grid-cols-[0.7fr_1.3fr] md:gap-20`}
          >
            <div>
              <p className={labelClass}>The perspective</p>
              <h2 className={headingClass}>A little about me</h2>
            </div>

            <div>
              <p className="whitespace-pre-line font-serif text-xl leading-9 text-[#41483F] sm:text-2xl sm:leading-10">
                {about}
              </p>
              <p className="mt-6 text-sm font-semibold text-[#527B5D]">
                {safeRole}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {validProjects.length > 0 && (
        <section
          id="editorial-work"
          className={`${container} scroll-mt-24 py-28 sm:py-36`}
        >
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={labelClass}>The archive</p>
              <h2 className={headingClass}>Selected work</h2>
              <p className="mt-5 max-w-xl leading-8 text-[#555B52]">
                A collection of projects, ideas, and experiences that reflect
                my interests and the work I care about.
              </p>
            </div>

            <span className="font-serif text-lg italic text-[#527B5D]">
              {String(validProjects.length).padStart(2, "0")} entries
            </span>
          </div>

          <div className="divide-y divide-[#20251F]/15 border-y border-[#20251F]/15">
            {validProjects.map((project, index) => {
              const technologies = Array.isArray(project.technologies)
                ? project.technologies
                : typeof project.technologies === "string"
                  ? project.technologies.split(",").map((item) => item.trim())
                  : [];

              return (
                <article
                  key={project.id ?? index}
                  className="group grid gap-6 py-10 transition-colors sm:grid-cols-[70px_1fr] sm:gap-10 sm:py-14 lg:grid-cols-[90px_1fr_auto]"
                >
                  <span className="pt-1 font-serif text-xl italic text-[#527B5D]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="font-serif text-2xl font-bold transition-colors group-hover:text-[#527B5D] sm:text-3xl lg:text-4xl">
                      {project.title || project.name}
                    </h3>

                    {project.description && (
                      <p className="mt-5 max-w-3xl whitespace-pre-line leading-8 text-[#555B52]">
                        {project.description}
                      </p>
                    )}

                    {technologies.filter(Boolean).length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {technologies.filter(Boolean).map((technology, techIndex) => (
                          <span
                            key={`${technology}-${techIndex}`}
                            className="text-xs font-semibold uppercase tracking-wider text-[#527B5D]"
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
                      <div className="mt-7 flex flex-wrap gap-6 text-sm font-semibold">
                        {(project.github_url || project.githubUrl) && (
                          <a
                            href={getWebsiteUrl(
                              project.github_url || project.githubUrl
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-[#527B5D]/50 underline-offset-4 transition hover:text-[#527B5D]"
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
                            className="underline decoration-[#527B5D]/50 underline-offset-4 transition hover:text-[#527B5D]"
                          >
                            Visit project ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="hidden text-2xl transition-transform group-hover:translate-x-1 lg:block">
                    ↗
                  </span>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Education */}
      {validEducation.length > 0 && (
        <section
          id="editorial-education"
          className="scroll-mt-24 border-y border-[#20251F]/10 bg-[#EAE5DA]"
        >
          <div className={`${container} py-24 sm:py-32`}>
            <p className={labelClass}>Academic background</p>
            <h2 className={headingClass}>Education</h2>

            <div className="mt-12 divide-y divide-[#20251F]/15 border-y border-[#20251F]/15">
              {validEducation.map((item, index) => (
                <article
                  key={item.id ?? index}
                  className="grid gap-5 py-9 sm:grid-cols-[1fr_auto] sm:gap-10 sm:py-12"
                >
                  <div>
                    <h3 className="font-serif text-2xl font-bold">
                      {item.qualification ||
                        item.degree ||
                        item.title ||
                        "Qualification"}
                    </h3>

                    {(item.institution || item.school || item.university) && (
                      <p className="mt-3 text-lg text-[#555B52]">
                        {item.institution || item.school || item.university}
                      </p>
                    )}

                    {(item.field || item.field_of_study) && (
                      <p className="mt-2 text-sm text-[#777B70]">
                        {item.field || item.field_of_study}
                      </p>
                    )}

                    {(item.description || item.details) && (
                      <p className="mt-4 max-w-3xl whitespace-pre-line leading-8 text-[#555B52]">
                        {item.description || item.details}
                      </p>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-[#527B5D]">
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
      {validExperience.length > 0 && (
        <section
          id="editorial-experience"
          className={`${container} scroll-mt-24 py-24 sm:py-32`}
        >
          <p className={labelClass}>Professional journey</p>
          <h2 className={headingClass}>Experience</h2>

          <div className="mt-12 divide-y divide-[#20251F]/15 border-y border-[#20251F]/15">
            {validExperience.map((item, index) => (
              <article key={item.id ?? index} className="py-9 sm:py-12">
                <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:gap-10">
                  <div>
                    <h3 className="font-serif text-2xl font-bold sm:text-3xl">
                      {item.position || item.role || item.title || "Position"}
                    </h3>

                    {(item.company || item.organization) && (
                      <p className="mt-3 text-lg text-[#555B52]">
                        {item.company || item.organization}
                      </p>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-[#527B5D]">
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
                  <p className="mt-5 max-w-4xl whitespace-pre-line leading-8 text-[#555B52]">
                    {item.description || item.details}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {safeSkills.length > 0 && (
        <section
          id="editorial-skills"
          className="scroll-mt-24 border-y border-[#20251F]/10 bg-[#EAE5DA]"
        >
          <div className={`${container} py-24 sm:py-32`}>
            <p className={labelClass}>Areas of expertise</p>
            <h2 className={headingClass}>Skills & tools</h2>

            <p className="mt-5 max-w-xl leading-8 text-[#555B52]">
              The technologies and abilities I bring to my work.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
              {safeSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="border border-[#527B5D]/35 px-5 py-3 text-sm font-semibold text-[#354D38] transition hover:bg-[#527B5D] hover:text-white"
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
          id="editorial-contact"
          className="scroll-mt-24 bg-[#20251F] text-[#F5F1E8]"
        >
          <div
            className={`${container} grid gap-12 py-24 sm:py-32 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20`}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#A8C5A8]">
                Continue the conversation
              </p>

              <h2 className="mt-7 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Every good conversation starts somewhere.
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-[#C5C8BE]">
                Have an idea, a question, or an opportunity? I'd be happy to
                hear from you.
              </p>
            </div>

            <div className="space-y-6 border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {email && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A8C5A8]">
                    Email
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="mt-2 inline-block break-all text-lg transition hover:text-[#A8C5A8]"
                  >
                    {email}
                  </a>
                </div>
              )}

              {phone && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A8C5A8]">
                    Phone
                  </p>
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="mt-2 inline-block text-lg transition hover:text-[#A8C5A8]"
                  >
                    {phone}
                  </a>
                </div>
              )}

              {location && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A8C5A8]">
                    Location
                  </p>
                  <p className="mt-2 text-lg">{location}</p>
                </div>
              )}

              {website && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#A8C5A8]">
                    Website
                  </p>
                  <a
                    href={getWebsiteUrl(website)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block break-all text-lg transition hover:text-[#A8C5A8]"
                  >
                    {website} ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-[#20251F] px-6 pb-8 text-sm text-[#C5C8BE] sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {safeName}. All rights reserved.
          </p>

          <a
            href="#editorial-home"
            className="transition hover:text-white"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}

export default EditorialTemplate;