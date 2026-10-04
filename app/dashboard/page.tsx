import PageHeader from "@/components/PageHeader";
import { getDashboardData } from "@/app/actions/dashboard-actions";
import MonthlyExpenseChart from "@/components/MonthlyExpenseCharts";
import CategoryExpenseChart from "@/components/CategoryExpenseChart";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();

  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <PageHeader
          title="Dashboard"
          description="Track your expenses and spending overview"
        />

        {/* Summary Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Expense */}
          <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5">
            <p className="text-sm text-slate-400">
              Total Expenses
            </p>

            <p className="mt-2 text-2xl font-bold text-purple-300">
              ₹{dashboard.totalExpense.toFixed(2)}
            </p>
          </div>


          {/* This Month */}
          <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5">
            <p className="text-sm text-slate-400">
              This Month
            </p>

            <p className="mt-2 text-2xl font-bold text-purple-300">
              ₹{dashboard.thisMonth.toFixed(2)}
            </p>
          </div>

          {/* You Owe */}
          <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5">
            <p className="text-sm text-slate-400">
              You Owe
            </p>

            <p className="mt-2 text-2xl font-bold text-red-400">
              ₹0.00
            </p>
          </div>

          {/* You Get */}
          <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5">
            <p className="text-sm text-slate-400">
              You Get
            </p>

            <p className="mt-2 text-2xl font-bold text-green-400">
              ₹0.00
            </p>
          </div>
        </div>

        <div className="mt-8">
          <MonthlyExpenseChart
            data={dashboard.monthlyData}
          />
        </div>

        <div className="mt-8">
          <CategoryExpenseChart
            data={dashboard.categoryData}
          />
        </div>

      </div>
    </main>
  );
}