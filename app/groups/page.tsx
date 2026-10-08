import GroupForm from "@/components/GroupForm";
import PageHeader from "@/components/PageHeader";
import { getGroups } from "@/app/actions/group-actions";
import DeleteGroupButton from "@/components/DeleteGroupButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function GroupsPage() {

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  const groups = await getGroups();


  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <PageHeader
          title="Groups"
          description="Manage trips, dinners, and shared expenses"
        />

        <div className="mt-8 max-w-2xl">
          <GroupForm />
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Your Groups
            </h2>

            <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
              {groups.length}{" "}
              {groups.length === 1 ? "group" : "groups"}
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {groups.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-[#121a2f] px-6 py-10 text-center md:col-span-2">
                <h3 className="text-lg font-semibold">
                  No groups yet
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Create your first group above.
                </p>
              </div>
            ) : (
              groups.map((group) => (
                <div
                  key={group.id}
                  className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5 transition hover:border-purple-500/50"
                >
                  <Link href={`/groups/${group.id}`}>
                    <h3 className="text-lg font-semibold">
                      {group.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {group.members.length}{" "}
                      {group.members.length === 1
                        ? "member"
                        : "members"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.members.map((member: string, index: number) => (
                        <span
                          key={`${member}-${index}`}
                          className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </Link>

                  <div className="mt-4">
                    <DeleteGroupButton groupId={group.id} />
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