import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const navigation = [
  { label: "Dashboard", icon: "▦", path: "/dashboard" },
  {
    label: "Personal Information",
    icon: "♙",
    path: "/create-portfolio?step=personal",
  },
  {
    label: "Choose Template",
    icon: "▧",
    path: "/create-portfolio?step=template",
  },
  {
    label: "Projects",
    icon: "▣",
    path: "/create-portfolio?step=projects",
  },
  {
    label: "Education",
    icon: "◇",
    path: "/create-portfolio?step=education",
  },
  {
    label: "Experience",
    icon: "▱",
    path: "/create-portfolio?step=experience",
  },
  {
    label: "Skills",
    icon: "✳",
    path: "/create-portfolio?step=skills",
  },
];


const stats = [
  { label: "Portfolio", value: "1", icon: "▤", color: "text-emerald-400" },
  { label: "Projects", value: "0", icon: "▣", color: "text-violet-400" },
  { label: "Education", value: "0", icon: "◇", color: "text-sky-400" },
  { label: "Experience", value: "0", icon: "▱", color: "text-orange-400" },
];

const checklist = [
  "Personal information",
  "Education",
  "Projects",
  "Experience",
  "Skills",
];

function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const savedUser = sessionStorage.getItem("user");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setUser(savedUser ? JSON.parse(savedUser) : {});
    } catch {
      setUser({});
    }
  }, [navigate]);

  function handleLogout() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  if (!user) return null;

  const displayName =
    user.full_name || user.name || user.username || user.email?.split("@")[0] || "there";

  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#080B09] text-[#F5F7F5]">
      {/* Mobile header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#080B09]/95 px-4 backdrop-blur-lg lg:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          className="rounded-lg border border-white/10 px-3 py-2 text-lg"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <Link to="/dashboard" className="text-lg font-bold tracking-tight">
          Portfolio<span className="text-[#00D68F]">Forge.</span>
        </Link>

        <div className="grid size-9 place-items-center rounded-full bg-violet-400/20 text-sm font-bold text-violet-200">
          {initials}
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`${menuOpen ? "translate-x-0" : "-translate-x-full"
            } fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/[0.08] bg-[#0A100D] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
        >
          <Link
            to="/dashboard"
            className="flex h-16 shrink-0 items-center gap-3 border-b border-white/[0.08] px-6"
          >
            <span className="grid size-9 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-xl font-bold text-[#00D68F]">
              P
            </span>
            <span className="text-lg font-bold">
              Portfolio<span className="text-[#00D68F]">Forge.</span>
            </span>
          </Link>


          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
            {navigation.map((item) => {
              const stepMap = {
                "Personal Information": "personal",
                "Choose Template": "template",
                Projects: "projects",
                Education: "education",
                Experience: "experience",
                Skills: "skills",
              };

              const currentStep = new URLSearchParams(location.search).get("step");

              const isActive =
                item.label === "Dashboard"
                  ? location.pathname === "/dashboard"
                  : location.pathname === "/create-portfolio" &&
                  currentStep === stepMap[item.label];

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${isActive
                      ? "bg-emerald-400/15 font-semibold text-[#5AFFB7]"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                    }`}
                >
                  <span className="w-5 text-center text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>


          <div className="shrink-0 border-t border-white/[0.08] p-4">
            <Link
              to="/settings"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              <span className="w-5 text-center text-lg">⚙</span>
              Settings
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-rose-300 transition hover:bg-rose-400/10"
            >
              <span className="w-5 text-center text-lg">↪</span>
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {menuOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          />
        )}

        {/* Main dashboard */}
        <main className="min-w-0 flex-1">
          <header className="hidden h-16 items-center justify-between border-b border-white/[0.08] px-8 lg:flex">
            <p className="text-sm text-gray-400">Your workspace</p>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300">{displayName}</span>
              <div className="grid size-9 place-items-center rounded-full bg-violet-400/20 text-sm font-bold text-violet-200">
                {initials}
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
            {/* Welcome */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5AFFB7]">
                  ✦ Your workspace
                </p>
                <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  Welcome back, {displayName}!
                </h1>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Build, personalize, and share your professional portfolio.
                </p>
              </div>

              <Link
                to="/create-portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D68F] px-5 py-3 text-sm font-bold text-[#041109] transition hover:bg-[#5AFFB7]"
              >
                Continue editing <span>↗</span>
              </Link>
            </section>

            {/* Overview cards */}
            <section className="grid grid-cols-2 gap-3 xl:grid-cols-4 xl:gap-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.08] bg-[#101511] p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{stat.label}</span>
                    <span className={`text-xl ${stat.color}`}>{stat.icon}</span>
                  </div>
                  <p className="mt-4 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-gray-500">Your portfolio data</p>
                </div>
              ))}
            </section>

            {/* Portfolio preview and completion */}
            <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl border border-white/[0.08] bg-[#101511] p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-bold">Your portfolio</h2>
                  <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                    Draft
                  </span>
                </div>

                <div className="mt-5 flex min-h-64 flex-col justify-between rounded-xl border border-emerald-400/10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,214,143,0.12),transparent_55%),#080B09] p-6 sm:p-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5AFFB7]">
                      YOUR NAME
                    </p>
                    <h3 className="mt-6 max-w-md text-3xl font-bold tracking-tight sm:text-4xl">
                      Your story starts here.
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                      Add your background, skills, and projects to create your
                      personal portfolio.
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/create-portfolio"
                      className="rounded-lg bg-[#00D68F] px-4 py-2.5 text-sm font-semibold text-[#041109] hover:bg-[#5AFFB7]"
                    >
                      Edit portfolio
                    </Link>
                    <Link
                      to="/create-portfolio"
                      className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-gray-200 hover:bg-white/[0.04]"
                    >
                      Open editor
                    </Link>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  Your public portfolio link will be available when publishing
                  is connected.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#101511] p-4 sm:p-6">
                <h2 className="font-bold">Complete your portfolio</h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Add the essentials to create a portfolio that represents you.
                </p>

                <div className="mt-6 space-y-5">
                  {checklist.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="grid size-6 place-items-center rounded-full border border-white/15 text-xs text-gray-500">
                        •
                      </span>
                      <span className="flex-1 text-sm text-gray-300">
                        {item}
                      </span>
                      <span className="text-xs text-gray-500">To do</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/create-portfolio"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00D68F] px-4 py-3 font-bold text-[#041109] transition hover:bg-[#5AFFB7]"
                >
                  Complete your portfolio <span>→</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;