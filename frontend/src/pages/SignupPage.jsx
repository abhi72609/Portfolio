
import { useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../services/auth";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const user = await signupUser({
        full_name: fullName.trim(),
        email: email.trim(),
        password,
      });

      setSuccess(`Account created successfully! Welcome, ${user.full_name}.`);

      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Unable to create your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080b09] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101512] p-8 shadow-2xl">
        <Link
          to="/"
          className="text-sm text-gray-400 transition hover:text-white"
        >
          ← Back home
        </Link>

        <div className="mt-7 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Start building your portfolio with Portfolia.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300"
          >
            {success}
            <p className="mt-2">
              <Link to="/login" className="underline hover:text-white">
                Go to login
              </Link>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm text-gray-300"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="full_name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Enter your full name"
              minLength={2}
              maxLength={100}
              required
              className="w-full rounded-lg border border-white/10 bg-[#090d0b] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-white/10 bg-[#090d0b] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              minLength={8}
              maxLength={128}
              required
              className="w-full rounded-lg border border-white/10 bg-[#090d0b] px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
