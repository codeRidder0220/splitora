"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateGroupExpense } from "@/app/actions/group-expense-actions";

interface EditGroupExpenseFormProps {
  expense: {
    id: string;
    groupId: string;
    title: string;
    amount: number;
    paidBy: string;
    date: string;
    note: string;
  };
  members: string[];
}

export default function EditGroupExpenseForm({
  expense,
  members,
}: EditGroupExpenseFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(String(expense.amount));
  const [paidBy, setPaidBy] = useState(expense.paidBy);
  const [date, setDate] = useState(expense.date.slice(0, 10));
  const [note, setNote] = useState(expense.note);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const result = await updateGroupExpense(expense.id, {
      groupId: expense.groupId,
      title,
      amount: Number(amount),
      paidBy,
      date,
      note: note || undefined,
    });
    setLoading(false);

    if (result.success) {
      router.push(`/groups/${expense.groupId}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-2xl border border-slate-800 bg-[#121a2f] p-6"
    >
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Expense Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Amount
        </label>

        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Paid By
        </label>

        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
        >
          {members.map((member, index) => (
            <option key={`${member}-${index}`} value={member}>
              {member}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Note
        </label>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-purple-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Expense"}
      </button>
    </form>
  );
}