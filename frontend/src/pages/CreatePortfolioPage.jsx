
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { templates } from "../data/templates";

function CreatePortfolioPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const requestedTemplate = searchParams.get("template");

  const initialTemplate = templates.some(
    (template) => template.id === requestedTemplate
  )
    ? requestedTemplate
    : "minimal";

  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    about: "",
    projects: [
      {
        id: 1,
        title: "",
        description: "",
      },
    ],
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleProjectChange(index, field, value) {
    setFormData((previous) => ({
      ...previous,
      projects: previous.projects.map((project, projectIndex) =>
        projectIndex === index
          ? { ...project, [field]: value }
          : project
      ),
    }));
  }

  function addProject() {
    setFormData((previous) => ({
      ...previous,
      projects: [
        ...previous.projects,
        {
          id: Date.now(),
          title: "",
          description: "",
        },
      ],
    }));
  }

  function removeProject(index) {
    setFormData((previous) => ({
      ...previous,
      projects: previous.projects.filter(
        (_, projectIndex) => projectIndex !== index
      ),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedData = {
      ...formData,
      name: formData.name.trim(),
      role: formData.role.trim(),
      about: formData.about.trim(),
      projects: formData.projects
        .map((project) => ({
          ...project,
          title: project.title.trim(),
          description: project.description.trim(),
        }))
        .filter((project) => project.title),
    };

    if (!cleanedData.name || !cleanedData.role || !cleanedData.about) {
      return;
    }

    navigate(`/portfolio?template=${encodeURIComponent(selectedTemplate)}`, {
      state: {
        portfolioData: cleanedData,
      },
    });
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#111713] px-4 py-3 text-white outline-none transition placeholder:text-[#718078] focus:border-[#00C875] focus:ring-2 focus:ring-[#00C875]/15";

  const labelClass = "text-sm font-semibold text-[#E3EBE5]";

  return (
    <main className="min-h-screen bg-[#070908] px-5 py-12 text-[#F4F7F4] sm:px-8">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="text-sm font-semibold text-[#8AFFC1] hover:text-white"
        >
          ← Back to Portfolia
        </a>

        <header className="mb-10 mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00E68A]">
            Your next chapter
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Build your portfolio.
          </h1>

          <p className="mt-4 leading-7 text-[#A4B0A8]">
            Add your details, choose a design, and preview your portfolio.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-[#0D110E] p-5 sm:p-8">
            <h2 className="text-xl font-bold">About you</h2>

            <div className="mt-6 space-y-5">
              <label className={labelClass}>
                Full name
                <input
                  className={inputClass}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Morgan"
                  autoComplete="name"
                  required
                />
              </label>

              <label className={labelClass}>
                Professional role
                <input
                  className={inputClass}
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  required
                />
              </label>

              <label className={labelClass}>
                Short bio
                <textarea
                  className={inputClass}
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell visitors who you are and what you do..."
                  rows={4}
                  required
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#0D110E] p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Your projects</h2>

              <button
                type="button"
                onClick={addProject}
                className="rounded-lg border border-[#00C875]/40 px-4 py-2 text-sm font-semibold text-[#8AFFC1] transition hover:bg-[#00C875]/10"
              >
                + Add project
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {formData.projects.map((project, index) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-white/10 p-4 sm:p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold">Project {index + 1}</h3>

                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="text-sm text-red-300 hover:text-red-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <label className={labelClass}>
                    Project title
                    <input
                      className={inputClass}
                      value={project.title}
                      onChange={(event) =>
                        handleProjectChange(index, "title", event.target.value)
                      }
                      placeholder="Personal portfolio website"
                    />
                  </label>

                  <label className={`${labelClass} mt-5 block`}>
                    Description
                    <textarea
                      className={inputClass}
                      value={project.description}
                      onChange={(event) =>
                        handleProjectChange(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                      placeholder="What did you build?"
                      rows={3}
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#0D110E] p-5 sm:p-8">
            <h2 className="text-xl font-bold">Choose your template</h2>

            <p className="mt-2 text-sm leading-6 text-[#A4B0A8]">
              Select the design that best represents you.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {templates.map((template) => (
                <label
                  key={template.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    selectedTemplate === template.id
                      ? "border-[#00C875] bg-[#00C875]/10"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <input
                    type="radio"
                    name="template"
                    value={template.id}
                    checked={selectedTemplate === template.id}
                    onChange={() => setSelectedTemplate(template.id)}
                    className="accent-[#00C875]"
                  />

                  <span>
                    <span className="block font-semibold">
                      {template.name}
                    </span>
                    <span className="mt-1 block text-xs text-[#A4B0A8]">
                      {template.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#00C875] px-6 py-4 font-bold text-[#041109] transition hover:-translate-y-0.5 hover:bg-[#00E68A]"
          >
            Preview my portfolio ↗
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreatePortfolioPage;