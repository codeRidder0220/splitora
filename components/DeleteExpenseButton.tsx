"use client";

import { useRouter } from "next/navigation";
import { deleteExpense } from "@/app/actions/expense-action";

interface DeleteExpenseButtonProps {
    expenseId: string;
}

export default function DeleteExpenseButton({ expenseId, }: DeleteExpenseButtonProps) {

    const router = useRouter();

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmed) {
            return;
        }

        const result = await deleteExpense(expenseId);

        if (result.success) {
            router.refresh();
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-500 hover:bg-red-500/10"
        >
            Delete
        </button>
    );
}