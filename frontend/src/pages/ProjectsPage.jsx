import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api/projects";

const emptyForm = {
  title: "",
  description: "",
  technologies: "",
  github_url: "",
  live_url: "",
};

function ProjectsPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = sessionStorage.getItem("access_token");

  const request = useCallback(async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });

    if (response.status === 401) {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("user");
      navigate("/login", { replace: true });
      throw new Error("Your session expired. Please log in again.");
    }

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const message = Array.isArray(body.detail)
        ? body.detail.map((item) => item.msg).join(", ")
        : body.detail;

      throw new Error(message || "Something went wrong.");
    }

    if (response.status === 204) return null;
    return response.json();
  }, [navigate]);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await request(API_URL);
      setProjects(data);
    } catch (err) {
      setError(err.message || "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    loadProjects();
  }, [token, navigate, loadProjects]);

  function startNewProject() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  function startEditing(project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      github_url: project.github_url || "",
      live_url: project.live_url || "",
    });
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      github_url: form.github_url.trim() || null,
      live_url: form.live_url.trim() || null,
      image_url: null,
    };

    try {
      if (editingId !== null) {
        await request(`${API_URL}/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setSuccess("Project updated successfully.");
      } else {
        await request(API_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setSuccess("Project added successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadProjects();
    } catch (err) {
      setError(err.message || "Unable to save this project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(project) {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await request(`${API_URL}/${project.id}`, { method: "DELETE" });
      setProjects((current) =>
        current.filter((item) => item.id !== project.id)
      );
      setSuccess("Project deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete this project.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#080B09] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#00D68F]";

  return (
    <main className="min-h-screen bg-[#080B09] px-4 py-6 text-[#F5F7F5] sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/dashboard"
          className="text-sm font-medium text-[#5AFFB7] hover:text-white"
        >
          ← Back to dashboard
        </Link>

        <header className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5AFFB7]">
              Your work
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Projects
            </h1>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Showcase the work you've built and the skills you've learned.
            </p>
          </div>

          <button
            type="button"
            onClick={startNewProject}
            className="rounded-xl bg-[#00D68F] px-5 py-3 text-sm font-bold text-[#041109] transition hover:bg-[#5AFFB7]"
          >
            + Add project
          </button>
        </header>

        {error && (
          <div role="alert" className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div role="status" className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
            {success}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5 rounded-2xl border border-white/10 bg-[#101511] p-5 sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">
                {editingId !== null ? "Edit project" : "New project"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold sm:col-span-2">
                Project title *
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  maxLength={150}
                  placeholder="e.g. Hospital Management Website"
                  required
                />
              </label>

              <label className="text-sm font-semibold sm:col-span-2">
                Description *
                <textarea
                  className={inputClass}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  maxLength={5000}
                  rows={4}
                  placeholder="What does the project do? What did you build?"
                  required
                />
              </label>

              <label className="text-sm font-semibold sm:col-span-2">
                Technologies
                <input
                  className={inputClass}
                  value={form.technologies}
                  onChange={(e) =>
                    setForm({ ...form, technologies: e.target.value })
                  }
                  placeholder="React, FastAPI, PostgreSQL"
                />
                <span className="mt-1 block text-xs font-normal text-gray-500">
                  Separate technologies with commas.
                </span>
              </label>

              <label className="text-sm font-semibold">
                GitHub repository URL
                <input
                  type="url"
                  className={inputClass}
                  value={form.github_url}
                  onChange={(e) =>
                    setForm({ ...form, github_url: e.target.value })
                  }
                  placeholder="https://github.com/..."
                />
              </label>

              <label className="text-sm font-semibold">
                Live demo URL
                <input
                  type="url"
                  className={inputClass}
                  value={form.live_url}
                  onChange={(e) =>
                    setForm({ ...form, live_url: e.target.value })
                  }
                  placeholder="https://yourproject.com"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-[#00D68F] px-5 py-3.5 font-bold text-[#041109] transition hover:bg-[#5AFFB7] disabled:opacity-60 sm:w-auto"
            >
              {saving
                ? "Saving..."
                : editingId !== null
                  ? "Save changes"
                  : "Save project"}
            </button>
          </form>
        )}

        {loading ? (
          <p className="py-16 text-center text-gray-400">Loading projects...</p>
        ) : projects.length === 0 ? (
          <section className="mt-8 rounded-2xl border border-dashed border-white/15 bg-[#101511] px-6 py-14 text-center sm:py-20">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-400/10 text-2xl text-[#5AFFB7]">
              ↗
            </div>
            <h2 className="mt-5 text-xl font-bold">Your projects start here</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
              Add your first project to showcase your skills, share your work,
              and strengthen your portfolio.
            </p>
            <button
              type="button"
              onClick={startNewProject}
              className="mt-6 rounded-xl bg-[#00D68F] px-5 py-3 font-bold text-[#041109] hover:bg-[#5AFFB7]"
            >
              Add your first project
            </button>
          </section>
        ) : (
          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-[#101511] p-5"
              >
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={`${project.title} preview`}
                    className="mb-4 aspect-video w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="mb-4 grid aspect-video place-items-center rounded-xl border border-white/[0.06] bg-gradient-to-br from-emerald-400/10 to-transparent text-3xl text-emerald-300">
                    ◇
                  </div>
                )}

                <h2 className="break-words text-lg font-bold">{project.title}</h2>
                <p className="mt-2 flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-gray-400">
                  {project.description}
                </p>

                {project.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1 text-xs text-emerald-200"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5AFFB7] hover:text-white"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5AFFB7] hover:text-white"
                    >
                      Live demo ↗
                    </a>
                  )}
                </div>

                <div className="mt-5 flex gap-3 border-t border-white/[0.08] pt-4">
                  <button
                    type="button"
                    onClick={() => startEditing(project)}
                    className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/[0.04]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(project)}
                    className="flex-1 rounded-lg border border-red-400/20 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-400/10"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default ProjectsPage;