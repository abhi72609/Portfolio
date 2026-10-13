const features = [
  {
    number: "01",
    title: "Choose Your Template",
    description:
      "Explore different portfolio designs and choose the one that best represents your personality and career.",
    icon: "✳",
  },
  {
    number: "02",
    title: "Add Your Information",
    description:
      "Enter your skills, projects, education, experience, and contact details in one simple form.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Share Your Portfolio",
    description:
      "Publish your portfolio and get a unique URL you can share with recruiters and employers.",
    icon: "⌘",
  },
];

function FeaturesSection() {
  return (
    <section
      id="how-it-works"
      className="bg-[#050605] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#72977A]">
            How it works
          </p>

          <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#F2F4F2] sm:text-5xl">
            From your information
            <span className="block text-[#72977A]">
              to your own website.
            </span>
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-gray-400">
            Building your personal portfolio should be simple.
            Follow three easy steps to create a professional online presence.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.number}
              style={{ transitionDelay: `${index * 100}ms` }}
              className="group rounded-2xl border border-white/[0.08] bg-[#0B0E0B] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#315B3D] hover:bg-[#101711]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#72977A]">
                  {feature.number}
                </span>

                <span className="text-2xl text-[#72977A] transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </span>
              </div>

              <h3 className="mt-10 text-xl font-semibold text-[#F2F4F2]">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {feature.description}
              </p>

              <div className="mt-7 h-px w-full bg-white/[0.08] transition-colors group-hover:bg-[#315B3D]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;