"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateExpense } from "@/app/actions/expense-action";

interface EditExpenseFormProps {
  expense: {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    note: string;
  };
}

export default function EditExpenseForm({ expense, }: EditExpenseFormProps) {

  const router = useRouter();

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(String(expense.amount));
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(
    expense.date.slice(0, 10)
  );
  const [note, setNote] = useState(expense.note);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const result = await updateExpense(expense.id, {
      title,
      amount: Number(amount),
      category,
      date,
      note: note || undefined,
    });

    setLoading(false);

    if (result.success) {
      router.push("/expenses");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-2xl border border-slate-800 bg-[#121a2f] p-6"
    >
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Title
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
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
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