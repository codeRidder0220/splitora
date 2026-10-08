"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createExpense } from "@/app/actions/expense-action";

export default function ExpenseForm() {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

        const result = await createExpense({
            title,
            amount: Number(amount),
            category,
            date,
            note: note || undefined,
        });

        setLoading(false);

        if (result.success) {
            setTitle("");
            setAmount("");
            setCategory("Food");
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
                Add a personal expense to Splitora.
            </p>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Dinner"
                        className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none transition focus:border-purple-500"
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
                        placeholder="1200"
                        min="0"
                        className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none transition focus:border-purple-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none transition focus:border-purple-500"
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
                        className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none transition focus:border-purple-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Note
                    </label>

                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Optional note"
                        rows={3}
                        className="w-full resize-none rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none transition focus:border-purple-500"
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