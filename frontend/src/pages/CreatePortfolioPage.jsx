import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { templates } from "../data/templates";
import {
  getMyPortfolio,
  saveMyPortfolio,
} from "../services/portfolio";

const steps = [
  "Personal Information",
  "Choose Template",
  "Projects",
  "Education",
  "Experience",
  "Skills",
];


const emptyPortfolio = (name = "") => ({
  name,
  role: "",
  headline: "",
  about: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  projects: [],
  education: [],
  experience: [],
  skills: [],
});


function CreatePortfolioPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const requestedStep = searchParams.get("step");

  const stepIndex = {
    personal: 0,
    "personal-information": 0,
    template: 1,
    projects: 2,
    education: 3,
    experience: 4,
    skills: 5,
  };

  const requestedStepIndex = stepIndex[requestedStep];

  const requestedTemplate = searchParams.get("template");
  const validRequestedTemplate = templates.some(
    (template) => template.id === requestedTemplate
  )
    ? requestedTemplate
    : null;

  const [selectedTemplate, setSelectedTemplate] = useState(
    validRequestedTemplate || "minimal"
  );
  const [formData, setFormData] = useState(() => emptyPortfolio());
  const [currentStep, setCurrentStep] = useState(
    requestedStepIndex ?? 0
  );

  useEffect(() => {
    if (requestedStepIndex !== undefined) {
      setCurrentStep(requestedStepIndex);
      setError("");
      setNotice("");
    }
  }, [requestedStepIndex]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPortfolio() {
      try {
        const result = await getMyPortfolio();

        if (!active) return;

        const savedData = result.portfolio_data || {};
        const defaults = emptyPortfolio(
          sessionStorage.getItem("user")
            ? JSON.parse(sessionStorage.getItem("user")).full_name || ""
            : ""
        );

        setFormData({
          ...defaults,
          ...savedData,
          projects: Array.isArray(savedData.projects)
            ? savedData.projects
            : [],
          education: Array.isArray(savedData.education)
            ? savedData.education
            : [],
          experience: Array.isArray(savedData.experience)
            ? savedData.experience
            : [],
          skills: Array.isArray(savedData.skills)
            ? savedData.skills
            : [],
        });

        if (!validRequestedTemplate && result.template) {
          setSelectedTemplate(result.template);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Could not load your portfolio.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPortfolio();

    return () => {
      active = false;
    };
  }, [validRequestedTemplate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setNotice("");
  }

  function updateListItem(section, index, field, value) {
    setFormData((previous) => ({
      ...previous,
      [section]: previous[section].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));

    setNotice("");
  }

  function addListItem(section, item) {
    setFormData((previous) => ({
      ...previous,
      [section]: [
        ...previous[section],
        { id: `${Date.now()}-${previous[section].length}`, ...item },
      ],
    }));

    setNotice("");
  }

  function removeListItem(section, index) {
    setFormData((previous) => ({
      ...previous,
      [section]: previous[section].filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));

    setNotice("");
  }

  async function savePortfolio() {
    setSaving(true);
    setError("");
    setNotice("");

    const cleanedData = {
      ...formData,
      name: formData.name.trim(),
      role: formData.role.trim(),
      about: formData.about.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      website: formData.website.trim(),
      projects: formData.projects
        .map((item) => ({
          ...item,
          title: (item.title || "").trim(),
          description: (item.description || "").trim(),
        }))
        .filter((item) => item.title),
      education: formData.education
        .map((item) => ({
          ...item,
          institution: (item.institution || "").trim(),
          qualification: (item.qualification || "").trim(),
          field: (item.field || "").trim(),
          startDate: (item.startDate || "").trim(),
          endDate: (item.endDate || "").trim(),
          description: (item.description || "").trim(),
        }))
        .filter((item) => item.institution || item.qualification),
      experience: formData.experience
        .map((item) => ({
          ...item,
          company: (item.company || "").trim(),
          position: (item.position || "").trim(),
          startDate: (item.startDate || "").trim(),
          endDate: (item.endDate || "").trim(),
          description: (item.description || "").trim(),
        }))
        .filter((item) => item.company || item.position),
      skills: formData.skills
        .map((skill) => String(skill).trim())
        .filter(Boolean),
    };

    try {
      await saveMyPortfolio({
        template: selectedTemplate,
        portfolio_data: cleanedData,
      });

      setFormData(cleanedData);
      setNotice("Your portfolio has been saved.");
      return true;
    } catch (err) {
      setError(err.message || "Could not save your portfolio.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  function validateCurrentStep() {
    if (currentStep === 0) {
      if (!formData.name.trim() || !formData.role.trim() || !formData.about.trim()) {
        setError("Please enter your name, professional role, and short bio.");
        return false;
      }
    }

    setError("");
    return true;
  }

  async function handleNext() {
    if (!validateCurrentStep()) return;

    const saved = await savePortfolio();
    if (!saved) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
      setNotice("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(
        `/portfolio?template=${encodeURIComponent(selectedTemplate)}`
      );
    }
  }

  async function handleBack() {
    if (currentStep === 0) {
      navigate("/dashboard");
      return;
    }

    const saved = await savePortfolio();
    if (!saved) return;

    setCurrentStep((step) => step - 1);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#111713] px-4 py-3 text-white outline-none transition placeholder:text-[#718078] focus:border-[#00C875] focus:ring-2 focus:ring-[#00C875]/15";

  const labelClass = "block text-sm font-semibold text-[#E3EBE5]";

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#070908] px-5 text-white">
        <p className="text-[#A4B0A8]">Loading your saved portfolio...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070908] px-5 py-8 text-[#F4F7F4] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/dashboard"
          className="text-sm font-semibold text-[#8AFFC1] hover:text-white"
        >
          ← Back to dashboard
        </Link>

        <header className="mb-8 mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00E68A]">
            Your next chapter
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Build your portfolio.
          </h1>

          <p className="mt-4 leading-7 text-[#A4B0A8]">
            Complete each step. Your progress is saved to your account.
          </p>
        </header>

        {/* Progress */}
        <section className="mb-8 rounded-2xl border border-white/10 bg-[#0D110E] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-[#8AFFC1]">
              Step {currentStep + 1} of {steps.length}
            </p>
            <p className="text-right text-sm text-[#A4B0A8]">
              {steps[currentStep]}
            </p>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#00C875] transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>


          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <button
                key={step}
                type="button"
                onClick={() => {
                  setCurrentStep(index);
                  setError("");
                  setNotice("");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={saving}
                aria-current={currentStep === index ? "step" : undefined}
                className={`rounded-xl px-3 py-3 text-xs transition sm:text-sm ${currentStep === index
                  ? "bg-[#00C875]/15 font-bold text-[#8AFFC1] ring-1 ring-[#00C875]/30"
                  : "text-[#A4B0A8] hover:bg-white/5 hover:text-white"
                  }`}
              >
                <span className="block opacity-70">
                  Step {index + 1}
                </span>
                <span className="mt-1 block">
                  {step === "Personal Information"
                    ? "Personal"
                    : step === "Choose Template"
                      ? "Template"
                      : step}
                </span>
              </button>
            ))}
          </div>

        </section>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
          >
            {error}
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-[#00C875]/30 bg-[#00C875]/10 p-4 text-sm text-[#8AFFC1]"
          >
            {notice}
          </div>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleNext();
          }}
          className="space-y-6"
        >
          {/* Step 1: Personal information */}
          {currentStep === 0 && (
            <section className="space-y-5 rounded-2xl border border-white/10 bg-[#0D110E] p-5 sm:p-8">
              <div>
                <h2 className="text-xl font-bold">Personal information</h2>
                <p className="mt-2 text-sm leading-6 text-[#A4B0A8]">
                  Tell visitors who you are and how they can contact you.
                </p>
              </div>

              <label className={labelClass}>
                Full name *
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
                Headline
                <input
                  className={inputClass}
                  name="headline"
                  value={formData.headline || ""}
                  onChange={handleChange}
                  placeholder="Building digital experiences that matter"
                />
              </label>

              <label className={labelClass}>
                Professional role *
                <input
                  className={inputClass}
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Full Stack Developer"
                  required
                />
              </label>

              <label className={labelClass}>
                Short bio *
                <textarea
                  className={inputClass}
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell visitors about yourself..."
                  rows={4}
                  required
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Email
                  <input
                    className={inputClass}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                  />
                </label>

                <label className={labelClass}>
                  Phone
                  <input
                    className={inputClass}
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91..."
                  />
                </label>

                <label className={labelClass}>
                  Location
                  <input
                    className={inputClass}
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </label>

                <label className={labelClass}>
                  Website
                  <input
                    className={inputClass}
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />
                </label>
              </div>
            </section>
          )}

          {/* Step 2: Template */}
          {currentStep === 1 && (
            <section className="rounded-2xl border border-white/10 bg-[#0D110E] p-5 sm:p-8">
              <h2 className="text-xl font-bold">Choose your template</h2>
              <p className="mt-2 text-sm leading-6 text-[#A4B0A8]">
                You can change the design later without re-entering your data.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {templates.map((template) => (
                  <label
                    key={template.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${selectedTemplate === template.id
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
                      className="mt-1 accent-[#00C875]"
                    />
                    <span>
                      <span className="block font-semibold">
                        {template.name}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[#A4B0A8]">
                        {template.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </section>
          )}

          {/* Step 3: Projects */}
          {currentStep === 2 && (
            <section className="rounded-2xl border border-white/10 bg-[#0D110E] p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Your projects</h2>
                  <p className="mt-2 text-sm text-[#A4B0A8]">
                    Add work you want to showcase.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addListItem("projects", {
                      title: "",
                      description: "",
                      technologies: [],
                      github_url: "",
                      live_url: "",
                    })
                  }
                  className="rounded-lg border border-[#00C875]/40 px-4 py-2 text-sm font-semibold text-[#8AFFC1] hover:bg-[#00C875]/10"
                >
                  + Add project
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {formData.projects.map((project, index) => (
                  <article
                    key={project.id ?? index}
                    className="rounded-xl border border-white/10 p-4 sm:p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold">Project {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeListItem("projects", index)}
                        className="text-sm text-red-300 hover:text-red-200"
                      >
                        Remove
                      </button>
                    </div>

                    <label className={labelClass}>
                      Project title
                      <input
                        className={inputClass}
                        value={project.title || ""}
                        onChange={(event) =>
                          updateListItem(
                            "projects",
                            index,
                            "title",
                            event.target.value
                          )
                        }
                        placeholder="Portfolio website"
                      />
                    </label>

                    <label className={`${labelClass} mt-5`}>
                      Description
                      <textarea
                        className={inputClass}
                        value={project.description || ""}
                        onChange={(event) =>
                          updateListItem(
                            "projects",
                            index,
                            "description",
                            event.target.value
                          )
                        }
                        placeholder="What did you build?"
                        rows={3}
                      />
                    </label>

                    <label className={`${labelClass} mt-5`}>
                      Technologies (comma-separated)
                      <input
                        className={inputClass}
                        value={
                          Array.isArray(project.technologies)
                            ? project.technologies.join(", ")
                            : project.technologies || ""
                        }
                        onChange={(event) =>
                          updateListItem(
                            "projects",
                            index,
                            "technologies",
                            event.target.value
                              .split(",")
                              .map((item) => item.trim())
                              .filter(Boolean)
                          )
                        }
                        placeholder="React, FastAPI, PostgreSQL"
                      />
                    </label>

                    <label className={`${labelClass} mt-5`}>
                      Live project URL
                      <input
                        className={inputClass}
                        type="url"
                        value={project.live_url || ""}
                        onChange={(event) =>
                          updateListItem(
                            "projects",
                            index,
                            "live_url",
                            event.target.value
                          )
                        }
                        placeholder="https://..."
                      />
                    </label>

                    <label className={`${labelClass} mt-5`}>
                      GitHub URL
                      <input
                        className={inputClass}
                        type="url"
                        value={project.github_url || ""}
                        onChange={(event) =>
                          updateListItem(
                            "projects",
                            index,
                            "github_url",
                            event.target.value
                          )
                        }
                        placeholder="https://github.com/..."
                      />
                    </label>
                  </article>
                ))}

                {formData.projects.length === 0 && (
                  <p className="rounded-xl border border-dashed border-white/15 p-6 text-sm text-[#A4B0A8]">
                    No projects added yet. You can add projects now or continue
                    and add them later.
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Step 4: Education */}
          {currentStep === 3 && (
            <section className="rounded-2xl border border-white/10 bg-[#0D110E] p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Education</h2>
                  <p className="mt-2 text-sm text-[#A4B0A8]">
                    Add your qualifications and studies.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addListItem("education", {
                      institution: "",
                      qualification: "",
                      field: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                  className="rounded-lg border border-[#00C875]/40 px-4 py-2 text-sm font-semibold text-[#8AFFC1] hover:bg-[#00C875]/10"
                >
                  + Add education
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {formData.education.map((item, index) => (
                  <article
                    key={item.id ?? index}
                    className="rounded-xl border border-white/10 p-4 sm:p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold">Education {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeListItem("education", index)}
                        className="text-sm text-red-300 hover:text-red-200"
                      >
                        Remove
                      </button>
                    </div>

                    <label className={labelClass}>
                      Institution
                      <input
                        className={inputClass}
                        value={item.institution || ""}
                        onChange={(event) =>
                          updateListItem(
                            "education",
                            index,
                            "institution",
                            event.target.value
                          )
                        }
                        placeholder="University or college"
                      />
                    </label>

                    <label className={`${labelClass} mt-5`}>
                      Qualification
                      <input
                        className={inputClass}
                        value={item.qualification || ""}
                        onChange={(event) =>
                          updateListItem(
                            "education",
                            index,
                            "qualification",
                            event.target.value
                          )
                        }
                        placeholder="Bachelor's degree"
                      />
                    </label>

                    <label className={`${labelClass} mt-5`}>
                      Field of study
                      <input
                        className={inputClass}
                        value={item.field || ""}
                        onChange={(event) =>
                          updateListItem(
                            "education",
                            index,
                            "field",
                            event.target.value
                          )
                        }
                        placeholder="Computer Science"
                      />
                    </label>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <label className={labelClass}>
                        Start date
                        <input
                          className={inputClass}
                          value={item.startDate || ""}
                          onChange={(event) =>
                            updateListItem(
                              "education",
                              index,
                              "startDate",
                              event.target.value
                            )
                          }
                          placeholder="2022"
                        />
                      </label>
                      <label className={labelClass}>
                        End date
                        <input
                          className={inputClass}
                          value={item.endDate || ""}
                          onChange={(event) =>
                            updateListItem(
                              "education",
                              index,
                              "endDate",
                              event.target.value
                            )
                          }
                          placeholder="2026 or Present"
                        />
                      </label>
                    </div>

                    <label className={`${labelClass} mt-5`}>
                      Details
                      <textarea
                        className={inputClass}
                        value={item.description || ""}
                        onChange={(event) =>
                          updateListItem(
                            "education",
                            index,
                            "description",
                            event.target.value
                          )
                        }
                        rows={3}
                        placeholder="Relevant coursework, achievements..."
                      />
                    </label>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Step 5: Experience */}
          {currentStep === 4 && (
            <section className="rounded-2xl border border-white/10 bg-[#0D110E] p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Work experience</h2>
                  <p className="mt-2 text-sm text-[#A4B0A8]">
                    Include jobs, internships, or relevant professional work.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addListItem("experience", {
                      company: "",
                      position: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    })
                  }
                  className="rounded-lg border border-[#00C875]/40 px-4 py-2 text-sm font-semibold text-[#8AFFC1] hover:bg-[#00C875]/10"
                >
                  + Add experience
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {formData.experience.map((item, index) => (
                  <article
                    key={item.id ?? index}
                    className="rounded-xl border border-white/10 p-4 sm:p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold">Experience {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeListItem("experience", index)}
                        className="text-sm text-red-300 hover:text-red-200"
                      >
                        Remove
                      </button>
                    </div>

                    <label className={labelClass}>
                      Job title
                      <input
                        className={inputClass}
                        value={item.position || ""}
                        onChange={(event) =>
                          updateListItem(
                            "experience",
                            index,
                            "position",
                            event.target.value
                          )
                        }
                        placeholder="Full Stack Developer Intern"
                      />
                    </label>

                    <label className={`${labelClass} mt-5`}>
                      Company
                      <input
                        className={inputClass}
                        value={item.company || ""}
                        onChange={(event) =>
                          updateListItem(
                            "experience",
                            index,
                            "company",
                            event.target.value
                          )
                        }
                        placeholder="Company name"
                      />
                    </label>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <label className={labelClass}>
                        Start date
                        <input
                          className={inputClass}
                          value={item.startDate || ""}
                          onChange={(event) =>
                            updateListItem(
                              "experience",
                              index,
                              "startDate",
                              event.target.value
                            )
                          }
                          placeholder="Jan 2025"
                        />
                      </label>
                      <label className={labelClass}>
                        End date
                        <input
                          className={inputClass}
                          value={item.endDate || ""}
                          onChange={(event) =>
                            updateListItem(
                              "experience",
                              index,
                              "endDate",
                              event.target.value
                            )
                          }
                          placeholder="Present"
                        />
                      </label>
                    </div>

                    <label className={`${labelClass} mt-5`}>
                      Responsibilities and achievements
                      <textarea
                        className={inputClass}
                        value={item.description || ""}
                        onChange={(event) =>
                          updateListItem(
                            "experience",
                            index,
                            "description",
                            event.target.value
                          )
                        }
                        rows={4}
                        placeholder="Describe your work and achievements..."
                      />
                    </label>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Step 6: Skills */}
          {currentStep === 5 && (
            <section className="rounded-2xl border border-white/10 bg-[#0D110E] p-5 sm:p-8">
              <h2 className="text-xl font-bold">Your skills</h2>
              <p className="mt-2 text-sm leading-6 text-[#A4B0A8]">
                Add technical tools and professional skills. Separate them with
                commas.
              </p>

              <label className={`${labelClass} mt-6`}>
                Skills
                <textarea
                  className={inputClass}
                  rows={5}
                  value={formData.skills.join(", ")}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      skills: event.target.value
                        .split(",")
                        .map((skill) => skill.trimStart()),
                    }))
                  }
                  placeholder="React, JavaScript, Python, FastAPI, PostgreSQL, Git"
                />
              </label>

              <div className="mt-5 flex flex-wrap gap-2">
                {formData.skills
                  .map((skill) => skill.trim())
                  .filter(Boolean)
                  .map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-[#00C875]/30 bg-[#00C875]/10 px-3 py-1.5 text-sm text-[#8AFFC1]"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={saving}
              className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/5 disabled:opacity-50"
            >
              ← {currentStep === 0 ? "Dashboard" : "Back"}
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#00C875] px-7 py-3 font-bold text-[#041109] transition hover:bg-[#00E68A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : currentStep === steps.length - 1
                  ? "Save & preview ↗"
                  : "Save & continue →"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreatePortfolioPage;
