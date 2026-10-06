"use client";

import { useState } from "react";
import { login } from "@/app/actions/auth-actions";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setMessage("");
    setError("");

    const result = await login(
      email,
      password
    );
    console.log(result);

    if (!result.success) {
      setError(result.message ?? "Login failed! Please try again.");
      return;
    }

    setMessage(`Welcome back, ${result.name}!`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-800 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-800 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      {message && (
        <p className="text-sm text-green-400">
          {message}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-purple-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-purple-400"
      >
        Login
      </button>
    </form>
  );
}