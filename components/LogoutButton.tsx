"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth-actions";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const result = await logout();

    if (result.success) {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-red-500/30 px-5 py-2.5 font-semibold text-red-300 transition hover:border-red-500 hover:bg-red-500/10"
    >
      Logout
    </button>
  );
}