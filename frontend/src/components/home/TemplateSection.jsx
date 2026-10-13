
import { templates } from "../../data/templates";

function TemplateSection() {
  return (
    <section
      id="templates"
      className="relative overflow-hidden bg-[var(--color-bg)] py-24 sm:py-32"
    >
      <div className="section-container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Find your style</p>

            <h2 className="section-heading mt-5">
              One story.
              <span className="text-accent block">
                Five ways to tell it.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-text-muted)]">
              Explore thoughtfully designed portfolios and find the look that
              reflects your personality and professional goals.
            </p>
          </div>

          <p className="shrink-0 text-sm font-medium text-[var(--color-text-muted)]">
            <span className="mr-2 font-bold text-[var(--color-highlight)]">
              {String(templates.length).padStart(2, "0")}
            </span>
            curated templates
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => (
            <article
              key={template.id}
              className="template-card group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-primary)] hover:shadow-[0_20px_55px_rgba(0,200,117,0.10)] motion-reduce:transform-none"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`template-preview ${template.previewClass} relative min-h-[290px] overflow-hidden rounded-xl border border-white/[0.06] p-5 sm:min-h-[310px]`}
              >
                <div className="flex items-center justify-between gap-3 border-b border-current/15 pb-4">
                  <span className="truncate text-xs font-bold tracking-widest">
                    {template.name.toUpperCase()}.
                  </span>

                  <span className="shrink-0 text-[10px] font-medium tracking-wide opacity-60">
                    PORTFOLIO / {template.number}
                  </span>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="template-avatar shrink-0">
                    {template.initials}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight">
                      Alex Morgan
                    </h3>
                    <p className="mt-1 text-sm opacity-70">
                      {template.role}
                    </p>
                  </div>
                </div>

                <p className="mt-6 max-w-sm text-sm leading-6 opacity-80">
                  Creating meaningful digital experiences through thoughtful
                  design and technology.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="h-12 rounded-lg border border-current/10 bg-current/10" />
                  <div className="h-12 rounded-lg border border-current/10 bg-current/[0.06]" />
                </div>

                <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 rounded-full bg-[var(--color-primary)] opacity-[0.07] blur-3xl transition-opacity duration-300 group-hover:opacity-20" />
              </div>

              <div className="flex flex-1 items-center justify-between gap-3 px-2 pb-2 pt-5">
                <div className="min-w-0">
                  <h3 className="font-bold tracking-tight text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-highlight)]">
                    {template.name}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                    {template.description}
                  </p>
                </div>

                <a
                  href={`/create-portfolio?template=${encodeURIComponent(template.id)}`}
                  aria-label={`Choose the ${template.name} template`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 px-3 py-2 text-sm font-semibold text-[var(--color-highlight)] transition-all duration-300 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[#041109] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-highlight)]"
                >
                  Choose <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TemplateSection;
