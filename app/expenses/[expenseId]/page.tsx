import EditExpenseForm from "@/components/EditExpenseForm";
import { getExpenseById } from "@/app/actions/expense-action";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

interface ExpensePageProps {
  params: Promise<{
    expenseId: string;
  }>;
}

export default async function ExpensePage({ params, }: ExpensePageProps) {

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { expenseId } = await params;

  const expense = await getExpenseById(expenseId);

  if (!expense) {
    return (
      <main className="min-h-screen bg-[#0b1020] px-6 py-12 text-slate-100">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold">
            Expense not found
          </h1>

          <p className="mt-2 text-slate-400">
            The expense you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-100">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-3xl font-bold">
          Edit Expense
        </h1>

        <p className="mt-2 text-slate-400">
          Update your expense details.
        </p>

        <EditExpenseForm expense={expense} />
      </div>
    </main>
  );
}