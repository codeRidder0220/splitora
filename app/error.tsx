"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#0b1020] px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#121a2f] p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-100">
          Something went wrong
        </h1>

        <p className="mt-3 text-slate-400">
          We couldn't load this page. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-purple-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-purple-400"
        >
          Try again
        </button>
      </div>
    </main>
  );
}