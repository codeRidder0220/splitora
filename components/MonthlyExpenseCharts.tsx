"use client";

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from "recharts";

interface MonthlyExpenseChartProps {
  data: {
    month: string;
    amount: number;
  }[];
}

export default function MonthlyExpenseChart({
  data,
}: MonthlyExpenseChartProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#121a2f] p-5">
      <h2 className="text-xl font-semibold">
        Monthly Expenses
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Your spending over time
      </p>

      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toFixed(2)}`,
                "Expense",
              ]}
            />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#a78bfa"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}