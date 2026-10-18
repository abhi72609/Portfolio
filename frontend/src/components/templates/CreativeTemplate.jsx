
function CreativeTemplate({ data = {} }) {
  const {
    name = "Alex Morgan",
    role = "Creative Developer",
    headline = "",
    about = "I bring bold ideas to life through design, code, and experimentation.",
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

  const eyebrow = "text-xs font-bold uppercase tracking-[0.25em] text-[#00E68A]";
  const heading = "mt-4 text-3xl font-bold tracking-tight sm:text-5xl";
  const muted = "text-[#A4B0A8]";

  const getPeriod = (item) =>
    [item.startDate || item.start_date, item.endDate || item.end_date || (item.current ? "Present" : "")]
      .filter(Boolean)
      .join(" – ");

  return (
    <main className="min-h-screen overflow-hidden bg-[#090B0A] text-[#F4F7F4]">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#090B0A]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5 sm:px-10 lg:px-16">
          <a href="#creative-home" className="shrink-0 text-xl font-black tracking-tight">
            {firstName}<span className="text-[#00E68A]">.</span>
          </a>

          <div className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-xs text-[#A4B0A8] sm:gap-x-7 sm:text-sm">
            <a href="#creative-about" className="transition hover:text-[#8AFFC1]">About</a>
            {visibleProjects.length > 0 && (
              <a href="#creative-work" className="transition hover:text-[#8AFFC1]">Work</a>
            )}
            {visibleEducation.length > 0 && (
              <a href="#creative-education" className="transition hover:text-[#8AFFC1]">Education</a>
            )}
            {visibleExperience.length > 0 && (
              <a href="#creative-experience" className="transition hover:text-[#8AFFC1]">Experience</a>
            )}
            {visibleSkills.length > 0 && (
              <a href="#creative-skills" className="transition hover:text-[#8AFFC1]">Skills</a>
            )}
            {hasContact && (
              <a href="#creative-contact" className="transition hover:text-[#8AFFC1]">Contact</a>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="creative-home" className="relative isolate border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_25%,rgba(0,200,117,0.13),transparent_45%)]" />
        <div className="pointer-events-none absolute -right-24 top-36 -z-10 h-80 w-80 rounded-full bg-[#00C875]/10 blur-[110px]" />

        <div className="mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-36 lg:px-16 lg:py-44">
          <p className={eyebrow}>Independent creative portfolio</p>

          <p className="mt-10 text-sm font-medium text-[#A4B0A8]">
            Hello, I'm {name}
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl lg:text-8xl">
            {headline.trim() ? (
              headline
            ) : (
              <>
                Making ideas
                <span className="mt-2 block text-[#00E68A]">
                  impossible to ignore.
                </span>
              </>
            )}
          </h1>

          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
            <div>
              <p className="text-lg font-semibold text-[#8AFFC1]">{role}</p>
              {about && (
                <p className={`mt-5 max-w-2xl whitespace-pre-line text-base leading-8 sm:text-lg ${muted}`}>
                  {about}
                </p>
              )}
            </div>

            {visibleProjects.length > 0 && (
              <a
                href="#creative-work"
                className="inline-flex w-fit items-center gap-3 rounded-full bg-[#00C875] px-7 py-4 font-bold text-[#041109] transition hover:-translate-y-1 hover:bg-[#00E68A]"
              >
                Explore my work <span aria-hidden="true">↘</span>
              </a>
            )}
          </div>

          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-7 text-sm text-[#A4B0A8]">
            {location && <span>{location}</span>}
            {email && <a href={`mailto:${email}`} className="hover:text-[#8AFFC1]">{email}</a>}
            {website && (
              <a
                href={/^https?:\/\//i.test(website) ? website : `https://${website}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#8AFFC1]"
              >
                Website ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      {about && (
        <section id="creative-about" className="border-b border-white/10 bg-white/[0.025]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 sm:px-10 sm:py-28 md:grid-cols-[0.7fr_1.3fr] md:gap-20 lg:px-16">
            <div>
              <p className={eyebrow}>A little about me</p>
              <h2 className={heading}>Ideas with purpose.</h2>
            </div>
            <div>
              <p className="whitespace-pre-line text-lg leading-9 text-[#C2CBC4]">
                {about}
              </p>
              <p className="mt-7 text-sm font-semibold text-[#8AFFC1]">{role}</p>
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      <section id="creative-work" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5 sm:mb-16">
          <div>
            <p className={eyebrow}>Selected work</p>
            <h2 className={heading}>Things I've made.</h2>
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
                className="group rounded-2xl border border-white/10 bg-[#101512] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#00C875]/50 sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#00E68A]">
                    PROJECT / {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl text-[#8AFFC1] transition group-hover:translate-x-1">
                    ↗
                  </span>
                </div>

                <h3 className="mt-9 text-2xl font-bold tracking-tight sm:text-3xl">
                  {project.title || project.name}
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
                    ).map((tech, techIndex) => (
                      <span
                        key={`${tech}-${techIndex}`}
                        className="rounded-full border border-[#00C875]/25 px-3 py-1.5 text-xs text-[#8AFFC1]"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="hover:text-[#8AFFC1]">
                      GitHub ↗
                    </a>
                  )}
                  {(project.live_url || project.liveUrl) && (
                    <a href={project.live_url || project.liveUrl} target="_blank" rel="noreferrer" className="text-[#8AFFC1] hover:text-white">
                      Live project ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center sm:py-20">
            <p className="text-xl font-semibold">Your next project goes here.</p>
            <p className={`mt-3 ${muted}`}>Add projects to showcase your work.</p>
          </div>
        )}
      </section>

      {/* Education */}
      {visibleEducation.length > 0 && (
        <section id="creative-education" className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
            <p className={eyebrow}>Learning & growth</p>
            <h2 className={heading}>Education.</h2>

            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {visibleEducation.map((item, index) => (
                <article key={item.id ?? index} className="grid gap-4 py-7 sm:grid-cols-[1fr_auto] sm:gap-8 sm:py-9">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {item.qualification || item.degree || item.title || "Qualification"}
                    </h3>
                    <p className={`mt-2 ${muted}`}>
                      {item.institution || item.school || item.university || ""}
                    </p>
                    {(item.field || item.field_of_study) && (
                      <p className="mt-2 text-sm text-[#8AFFC1]">
                        {item.field || item.field_of_study}
                      </p>
                    )}
                    {(item.description || item.details) && (
                      <p className={`mt-4 whitespace-pre-line leading-7 ${muted}`}>
                        {item.description || item.details}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-[#8AFFC1]">{getPeriod(item)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {visibleExperience.length > 0 && (
        <section id="creative-experience" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
          <p className={eyebrow}>The journey</p>
          <h2 className={heading}>Experience.</h2>

          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {visibleExperience.map((item, index) => (
              <article key={item.id ?? index} className="grid gap-4 py-7 sm:grid-cols-[1fr_auto] sm:gap-8 sm:py-9">
                <div>
                  <h3 className="text-xl font-semibold">
                    {item.position || item.role || item.title || "Position"}
                  </h3>
                  <p className="mt-2 text-[#8AFFC1]">
                    {item.company || item.organization || ""}
                  </p>
                  {(item.description || item.details) && (
                    <p className={`mt-4 max-w-3xl whitespace-pre-line leading-8 ${muted}`}>
                      {item.description || item.details}
                    </p>
                  )}
                </div>
                <p className="text-sm text-[#8AFFC1]">{getPeriod(item)}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {visibleSkills.length > 0 && (
        <section id="creative-skills" className="border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
            <p className={eyebrow}>Tools of the trade</p>
            <h2 className={heading}>Skills & technologies.</h2>

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
      <section id="creative-contact" className="border-t border-white/10 bg-[#0D120F]">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <p className={eyebrow}>Let's connect</p>
          <div className="mt-5 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                Let's create something meaningful.
              </h2>
              <p className={`mt-6 max-w-xl leading-8 ${muted}`}>
                Have an idea, an opportunity, or a project in mind? I'd love to hear from you.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 text-sm">
              {email && <a href={`mailto:${email}`} className="font-semibold text-[#8AFFC1] hover:text-white">{email} ↗</a>}
              {phone && <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-[#8AFFC1]">{phone}</a>}
              {location && <p className={muted}>{location}</p>}
              {website && (
                <a
                  href={/^https?:\/\//i.test(website) ? website : `https://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#8AFFC1]"
                >
                  Visit website ↗
                </a>
              )}
              {!hasContact && (
                <a href={`mailto:hello@example.com`} className="rounded-full bg-[#00C875] px-6 py-3 font-bold text-[#041109] transition hover:bg-[#00E68A]">
                  Get in touch ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#A4B0A8] sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <a href="#creative-home" className="transition hover:text-[#8AFFC1]">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}

export default CreativeTemplate;