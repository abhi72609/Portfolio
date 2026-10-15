
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser({
        email: email.trim(),
        password,
      });

      // Save the token for authenticated API requests.
      // Never store the user's password.
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to the portfolio creation page after login.
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.message || "Unable to sign in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080B09] px-5 py-12 text-[#F0F3EF]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#24452E]/20 blur-[120px]"
      />

      <section className="relative z-10 w-full max-w-md animate-[fadeUp_0.6s_ease-out_both]">
        <Link to="/" className="mb-10 flex items-center justify-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl border border-[#28513A] bg-[#0D1B13] text-lg font-semibold text-[#80B394]">
            P
          </span>
          <span className="text-2xl font-semibold tracking-tight">
            Portfolia<span className="text-[#80B394]">.</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-white/[0.09] bg-[#0D110E]/90 p-7 shadow-2xl shadow-black/30 sm:p-9">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#80B394]">
            Welcome back
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Sign in to your account
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#9CA79E]">
            Continue building a portfolio that represents you.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-[#D0D7D0]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-[#080B09] px-4 py-3.5 text-sm outline-none transition focus:border-[#527B5D] focus:ring-2 focus:ring-[#456B50]/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-[#D0D7D0]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-[#080B09] px-4 py-3.5 text-sm outline-none transition focus:border-[#527B5D] focus:ring-2 focus:ring-[#456B50]/20"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#456B50] px-5 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#527B5D] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
            >
              {isLoading ? "Signing in..." : "Sign in"}
              {!isLoading && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#9CA79E]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#9BC4A4] hover:text-white"
            >
              Create one
            </Link>
          </p>
        </div>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-[#89948B] transition hover:text-white"
        >
          ← Back to home
        </Link>
      </section>
    </main>
  );
}

export default LoginPage;
