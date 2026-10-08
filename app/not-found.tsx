import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#0b1020] px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-purple-500">404</p>

        <h1 className="mt-4 text-2xl font-bold text-slate-100">
          Page not found
        </h1>

        <p className="mt-2 text-slate-400">
          The page you're looking for doesn't exist.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-xl bg-purple-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-purple-400"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}