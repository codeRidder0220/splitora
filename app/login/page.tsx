import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0b1020] px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold">
          Welcome back
        </h1>

        <p className="mt-2 text-slate-400">
          Login to continue using Splitora.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-[#121a2f] p-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}