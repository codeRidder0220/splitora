"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

interface NavbarProps {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0b1020]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <h1 className="bg-linear-to-b from-purple-900 to-purple-300 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            Splitora
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 sm:flex">
          <Link
            href="/dashboard"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/expenses"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Expenses
          </Link>

          <Link
            href="/groups"
            className="mr-10 text-sm text-slate-400 transition hover:text-white"
          >
            Groups
          </Link>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-slate-400">
                  Hi, {user.name}
                </span>

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full bg-linear-to-b from-purple-900 to-purple-500 px-5 py-2.5 font-semibold text-purple-350 transition hover:scale-105 hover:bg-linear-to-b hover:from-purple-500 hover:to-purple-900"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-full border border-purple-400 px-5 py-2.5 font-semibold text-purple-350 transition hover:scale-105 hover:bg-linear-to-b hover:from-purple-500 hover:to-purple-900"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg px-3 py-2 text-xl text-slate-200 sm:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-800 px-6 py-5 sm:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-slate-300 transition hover:text-purple-300"
            >
              Dashboard
            </Link>

            <Link
              href="/expenses"
              onClick={() => setIsOpen(false)}
              className="text-slate-300 transition hover:text-purple-300"
            >
              Expenses
            </Link>

            <Link
              href="/groups"
              onClick={() => setIsOpen(false)}
              className="text-slate-300 transition hover:text-purple-300"
            >
              Groups
            </Link>

            {user ? (
              <>
                <span className="text-sm text-slate-400">
                  Hi, {user.name}
                </span>

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-fit rounded-sm bg-purple-500 px-5 py-2 font-semibold text-slate-950 transition hover:bg-purple-400"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-fit rounded-sm border border-purple-400 px-5 py-2 font-semibold text-purple-300 transition hover:bg-purple-500 hover:text-slate-950"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}