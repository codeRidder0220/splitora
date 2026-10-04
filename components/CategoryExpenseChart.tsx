"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CategoryExpenseChartProps {
  data: {
    category: string;
    amount: number;
  }[];
}

export default function CategoryExpenseChart({
  data,
}: CategoryExpenseChartProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5">
      <h2 className="text-xl font-semibold">
        Expenses by Category
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        See where your money is going
      </p>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toFixed(2)}`,
                "Expense",
              ]}
            />

            <Bar
              dataKey="amount"
              fill="#8b5cf6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}