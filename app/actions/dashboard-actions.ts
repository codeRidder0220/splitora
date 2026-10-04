"use server";

import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";

//get data from expense ->
export async function getDashboardData() {
  await connectDB();

  const expenses = await Expense.find()
    .sort({ date: 1 })
    .lean();

  // 1. Total expense
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // 2. This month expense
  const now = new Date();

  const thisMonth = expenses.filter((expense) => {
    
      const expenseDate = new Date(expense.date);

      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  // 3. Category-wise expenses
  const categoryMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    if (!categoryMap[expense.category]) {
      categoryMap[expense.category] = 0;
    }

    categoryMap[expense.category] += expense.amount;
  });

  const categoryData = Object.entries(categoryMap).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  // 4. Monthly expenses
  const monthlyMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);

    const month = date.toLocaleString("en-US", {
      month: "short",
    });

    const year = date.getFullYear();

    const key = `${month} ${year}`;

    if (!monthlyMap[key]) {
      monthlyMap[key] = 0;
    }

    monthlyMap[key] += expense.amount;
  });

  const monthlyData = Object.entries(monthlyMap).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  return {
    totalExpense,
    thisMonth,
    categoryData,
    monthlyData,
  };
}