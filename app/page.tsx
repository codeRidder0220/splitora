import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-100">

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="mb-6 inline-flex rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm font-medium text-purple-300">
          Simple money management
        </div>

        <h2 className="text-5xl font-black tracking-tight sm:text-6xl">
          Smart expenses.
          <br />
          <span className="bg-linear-to-b from-purple-900 to-purple-300 bg-clip-text text-transparent">Simple settlements.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Track your personal expenses, split group expenses,
          and easily see who owes whom.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-xl bg-purple-400 px-7 py-3.5 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-purple-300"
        >
          Get Started
        </Link>

      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-24 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-7 transition hover:-translate-y-1 hover:border-blue-400/40">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-xl">
            ₹
          </div>

          <h3 className="text-xl font-bold">
            Personal Expenses
          </h3>

          <p className="mt-3 leading-7 text-slate-400">
            Keep track of your daily expenses and understand
            where your money goes.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-7 transition hover:-translate-y-1 hover:border-red-400/40">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-xl">
            ↔
          </div>

          <h3 className="text-xl font-bold">
            Group Expenses
          </h3>

          <p className="mt-3 leading-7 text-slate-400">
            Split expenses with your friends without manually
            calculating everyone's share.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-7 transition hover:-translate-y-1 hover:border-green-400/40">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-xl">
            ✓
          </div>

          <h3 className="text-xl font-bold">
            Simple Settlements
          </h3>

          <p className="mt-3 leading-7 text-slate-400">
            Quickly understand who needs to pay whom and
            settle your expenses easily.
          </p>
        </div>
      </section>
    </main>
  );
}