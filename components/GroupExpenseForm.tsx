"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGroupExpense } from "@/app/actions/group-expense-actions";

interface GroupExpenseFormProps {
  groupId: string;
  members: string[];
}

export default function GroupExpenseForm({ groupId, members, }: GroupExpenseFormProps) {


  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(members[0] ?? "");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    setLoading(true);

    const result = await createGroupExpense({
      groupId,
      title,
      amount: Number(amount),
      paidBy,
      date,
      note: note || undefined,
    });

    setLoading(false);

    if (result.success) {
      setTitle("");
      setAmount("");
      setPaidBy(members[0] ?? "");
      setDate("");
      setNote("");

      router.refresh();
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-6">
      <h2 className="text-xl font-semibold">
        Add Expense
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Add an expense paid by one of the group members.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Expense Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Hotel"
            className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Amount
          </label>

          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="4000"
            className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
          />
        </div>

        {/* Paid By */}
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

        {/* Date */}
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

        {/* Note */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Note
          </label>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="2 nights hotel"
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-purple-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}