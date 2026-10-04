import EditGroupExpenseForm from "@/components/EditGroupExpenseForm";
import { getGroupExpenseById } from "@/app/actions/group-expense-actions";
import { getGroupById } from "@/app/actions/group-actions";

interface ExpensePageProps {
  params: Promise<{
    groupId: string;
    expenseId: string;
  }>;
}

export default async function GroupExpensePage({
  params,
}: ExpensePageProps) {
  const { groupId, expenseId } = await params;
  

  const group = await getGroupById(groupId);
  const expense = await getGroupExpenseById(expenseId);

  if (!group || !expense) {
    return (
      <main className="min-h-screen bg-[#0b1020] px-6 py-12 text-slate-100">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold">
            Expense not found
          </h1>

          <p className="mt-2 text-slate-400">
            The group expense you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-100">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="text-sm text-purple-300">
          {group.name}
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Edit Group Expense
        </h1>

        <EditGroupExpenseForm
          expense={expense}
          members={group.members}
        />
      </div>
    </main>
  );
}