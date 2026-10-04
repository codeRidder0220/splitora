import { getGroupById } from "@/app/actions/group-actions";
import GroupExpenseForm from "@/components/GroupExpenseForm";
import { getGroupExpenses } from "@/app/actions/group-expense-actions";
import DeleteGroupExpenseButton from "@/components/DeleteGroupExpenseButton";
import { calculateSettlement } from "@/lib/calculationsettlement";
import Link from "next/link";


interface GroupPageProps {
  params: Promise<{
    groupId: string;
  }>;
}

export default async function GroupPage({ params, }: GroupPageProps) {

  const { groupId } = await params;

  const group = await getGroupById(groupId);


  if (!group) {
    return (
      <main className="min-h-screen bg-[#0b1020] px-6 py-12 text-slate-100">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold">
            Group not found
          </h1>

          <p className="mt-2 text-slate-400">
            The group you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  const expenses = await getGroupExpenses(groupId);
  const settlement = calculateSettlement(group.members, expenses);

  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm text-purple-300">
          Group
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {group.name}
        </h1>

        <p className="mt-2 text-slate-400">
          {group.members.length}{" "}
          {group.members.length === 1
            ? "member"
            : "members"}
        </p>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-[#121a2f] p-6">
          <h2 className="text-lg font-semibold">
            Members
          </h2>

          <div className="mt-4 space-y-3">
            {group.members.map((member: string, index: number) => (
              <div
                key={`${member}-${index}`}
                className="rounded-xl border border-slate-800 bg-[#0b1020] px-4 py-3 text-slate-300"
              >
                {member}
              </div>
            ))}
          </div>

        </div>

        <div className="mt-8">
          <GroupExpenseForm
            groupId={group.id}
            members={group.members}
          />
        </div>

        {/* summary--------------------------------------------------- */}
        
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5">
            <p className="text-sm text-slate-400">
              Total Group Expense
            </p>

            <p className="mt-2 text-2xl font-bold text-purple-300">
              ₹{settlement.total.toFixed(2)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5">
            <p className="text-sm text-slate-400">
              Equal Share Per Person
            </p>

            <p className="mt-2 text-2xl font-bold text-purple-300">
              ₹{settlement.share.toFixed(2)}
            </p>
          </div>
        </div>

        {/* members balance----------------------------------------- */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Member Balances
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {settlement.balances.map((balance) => (
              <div
                key={balance.member}
                className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5"
              >
                <h3 className="font-semibold">
                  {balance.member}
                </h3>

                <div className="mt-3 space-y-1 text-sm">
                  <p className="text-slate-400">
                    Paid: ₹{balance.paid.toFixed(2)}
                  </p>

                  <p className="text-slate-400">
                    Share: ₹{balance.share.toFixed(2)}
                  </p>

                  <p
                    className={
                      balance.balance > 0
                        ? "text-green-400"
                        : balance.balance < 0
                          ? "text-red-400"
                          : "text-slate-400"
                    }
                  >
                    {balance.balance > 0
                      ? `Gets ₹${balance.balance.toFixed(2)}`
                      : balance.balance < 0
                        ? `Owes ₹${Math.abs(balance.balance).toFixed(2)}`
                        : "Settled"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* settlement-------------------------------------------- */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Settlements
          </h2>

          <div className="mt-4 space-y-3">
            {settlement.settlements.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-[#121a2f] px-6 py-8 text-center">
                <p className="text-slate-400">
                  Everyone is settled up.
                </p>
              </div>
            ) : (
              settlement.settlements.map((item, index) => (
                <div
                  key={`${item.from}-${item.to}-${index}`}
                  className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-slate-300">
                      <span className="font-semibold text-white">
                        {item.from}
                      </span>{" "}
                      owes{" "}
                      <span className="font-semibold text-white">
                        {item.to}
                      </span>
                    </p>

                    <p className="text-lg font-bold text-purple-300">
                      ₹{item.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>



        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Group Expenses
            </h2>

            <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
              {expenses.length}{" "}
              {expenses.length === 1 ? "expense" : "expenses"}
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {expenses.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-[#121a2f] px-6 py-10 text-center">
                <h3 className="text-lg font-semibold">
                  No expenses yet
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Add the first expense for this group.
                </p>
              </div>
            ) : (
              expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {expense.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Paid by {expense.paidBy}
                      </p>
                    </div>

                    <p className="text-xl font-semibold text-purple-300">
                      ₹{expense.amount}
                    </p>
                  </div>

                  <p className="mt-3 text-sm text-slate-400">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>

                  {expense.note && (
                    <p className="mt-2 text-sm text-slate-500">
                      {expense.note}
                    </p>
                  )}

                  <div className="mt-4 flex gap-3">
                    <Link
                      href={`/groups/${group.id}/expenses/${expense.id}`}
                      className="rounded-lg border border-purple-500/30 px-3 py-2 text-sm text-purple-300 transition hover:border-purple-500 hover:bg-purple-500/10"
                    >
                      Edit
                    </Link>

                    <DeleteGroupExpenseButton
                      expenseId={expense.id}
                    />
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