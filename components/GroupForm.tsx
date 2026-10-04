"use client";

import { useState } from "react";
import { createGroup } from "@/app/actions/group-actions";
import { useRouter } from "next/navigation";

export default function GroupForm() {
    const [name, setName] = useState("");
    const [members, setMembers] = useState<string[]>([]);
    const [memberName, setMemberName] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();


    function addMember() {
        const trimmedName = memberName.trim();

        if (!trimmedName) {
            return;
        }

        if (members.includes(trimmedName)) {
            return;
        }

        setMembers([...members, trimmedName]);
        setMemberName("");
    }

    function removeMember(indexToRemove: number) {
        setMembers(
            members.filter((_, index) => index !== indexToRemove)
        );
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!name.trim()) {
            setError("Please enter a group name.");
            return;
        }

        if (members.length === 0) {
            setError("Please add at least one member.");
            return;
        }

        setError("");

        const result = await createGroup({
            name,
            members,
        });

        if (result.success) {
            setName("");
            setMembers([]);
            setMemberName("");

            router.refresh();
        }
    }

    return (
        <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-6">
            <h2 className="text-xl font-semibold">
                Create Group
            </h2>

            <p className="mt-1 text-sm text-slate-400">
                Create a group for trips, dinners, or shared expenses.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-5"
            >
                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Group Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Goa Trip"
                        className="w-full rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Add Member
                    </label>

                    <div className="flex w-full gap-2">
                        <input
                            type="text"
                            value={memberName}
                            onChange={(e) =>
                                setMemberName(e.target.value)
                            }
                            placeholder="Rahul"
                            className=" min-w-0 flex-1 rounded-xl border border-slate-700 bg-[#0b1020] px-4 py-3 text-slate-100 outline-none focus:border-purple-500"
                        />

                        <button
                            type="button"
                            onClick={addMember}
                            className="shrink-0 rounded-xl border border-purple-500/40 px-4 py-3 text-purple-300 transition hover:bg-purple-500/10"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {members.length > 0 && (
                    <div>
                        <p className="mb-2 text-sm text-slate-300">
                            Members
                        </p>

                        <div className="space-y-2">
                            {members.map((member, index) => (
                                <div
                                    key={`${member}-${index}`}
                                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#0b1020] px-4 py-3"
                                >
                                    <span className="text-slate-300">
                                        {member}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => removeMember(index)}
                                        className="text-sm text-red-300 transition hover:text-red-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full rounded-xl bg-purple-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-purple-400"
                >
                    Create Group
                </button>

                {error && (
                    <p className="text-sm text-red-300">
                        {error}
                    </p>
                )}

            </form>
        </div>
    );
}