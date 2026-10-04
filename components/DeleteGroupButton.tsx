"use client";

import { useRouter } from "next/navigation";
import { deleteGroup } from "@/app/actions/group-actions";

interface DeleteGroupButtonProps {
  groupId: string;
}

export default function DeleteGroupButton({
  groupId,
}: DeleteGroupButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );

    if (!confirmed) {
      return;
    }

    const result = await deleteGroup(groupId);

    if (result.success) {
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-300 transition hover:border-red-500 hover:bg-red-500/10"
    >
      Delete
    </button>
  );
}