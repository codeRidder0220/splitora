import Link from "next/link";
import ExpenseForm from "@/components/ExpenseForm";
import PageHeader from "@/components/PageHeader";
import { getExpenses } from "@/app/actions/expense-action";
import DeleteExpenseButton from "@/components/DeleteExpenseButton";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function ExpensesPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    const expenses = await getExpenses();

    return (
        <main className="min-h-screen bg-[#0b1020] text-slate-100">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <PageHeader
                    title="Expenses"
                    description="Track your personal expenses"
                />

                <div className="mt-8 max-w-2xl">
                    <ExpenseForm />
                </div>
                <div className="mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Your Expenses
                        </h2>

                        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                            {expenses.length}{" "}
                            {expenses.length === 1 ? "expense" : "expenses"}
                        </span>
                    </div>


                    <div className="mt-4 space-y-4">
                        {expenses.length === 0 ? (
                            <div className="rounded-2xl border border-slate-800 bg-[#121a2f] px-6 py-12 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-2xl">
                                    💸
                                </div>

                                <h3 className="mt-4 text-lg font-semibold">
                                    No expenses yet
                                </h3>

                                <p className="mt-2 text-sm text-slate-400">
                                    Your expenses will appear here once you add your first one.
                                </p>
                            </div>
                        ) : (
                            expenses.map((expense) => (
                                <div
                                    key={expense.id}
                                    className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold">
                                                {expense.title}
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-400">
                                                {expense.category} •{" "}
                                                {new Date(expense.date).toLocaleDateString("en-IN")}
                                            </p>
                                        </div>

                                        <p className="text-lg font-bold text-purple-300">
                                            ₹{expense.amount}
                                        </p>
                                    </div>

                                    {expense.note && (
                                        <p className="mt-3 text-sm text-slate-400">
                                            {expense.note}
                                        </p>
                                    )}
                                    <div className="mt-4 flex gap-3">
                                        <Link
                                            href={`/expenses/${expense.id}`}
                                            className="inline-flex rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-300"
                                        >
                                            Edit
                                        </Link>

                                        <DeleteExpenseButton expenseId={expense.id} />
                                    </div>


                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}