"use server";

import { connectDB } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import type { ExpenseInput } from "@/types/expense";

export async function createExpense(data: ExpenseInput) {
  await connectDB();

  //create expenses
  const expense = await Expense.create({
    title: data.title,
    amount: data.amount,
    category: data.category,
    date: data.date,
    note: data.note,
  });

  return {
    success: true,
    expenseId: expense._id.toString(),
  };
}

//show expenses
export async function getExpenses() {
  await connectDB();

  const expenses = await Expense.find()
    .sort({ date: -1 })  //newest data first
    .lean();       //Mongoose ke heavy document objects ki jagah simple JavaScript objects deta hai.

  return expenses.map((expense) => ({
    id: expense._id.toString(),
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date.toISOString(),
    note: expense.note ?? "",
  }));
}

//update functionality 
export async function updateExpense(
  id: string,
  data: ExpenseInput
) {
  await connectDB();

  const expense = await Expense.findByIdAndUpdate(
    id,
    {
      title: data.title,
      amount: data.amount,
      category: data.category,
      date: data.date,
      note: data.note,
    },
    {
      new: true,
    }
  );

  if (!expense) {
    return {
      success: false,
      message: "Expense not found",
    };
  }

  return {
    success: true,
    expenseId: expense._id.toString(),
  };
}

//get expenses by id =>
export async function getExpenseById(id: string) {
  await connectDB();

  const expense = await Expense.findById(id).lean();

  if (!expense) {
    return null;
  }

  return {
    id: expense._id.toString(),
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date.toISOString(),
    note: expense.note ?? "",
  };
}

//delete a expenses =>
export async function deleteExpense(id: string) {
  await connectDB();

  const expense = await Expense.findByIdAndDelete(id);

  if (!expense) {
    return {
      success: false,
      message: "Expense not found",
    };
  }

  return {
    success: true,
  };
}