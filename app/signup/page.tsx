import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#0b1020] px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold">
          Create your account
        </h1>

        <p className="mt-2 text-slate-400">
          Start managing your expenses with Splitora.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-[#121a2f] p-6">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}