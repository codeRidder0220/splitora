"use server";

import { connectDB } from "@/lib/mongodb";
import GroupExpense from "@/models/GroupExpense";
import type { GroupExpenseInput } from "@/types/group-expense";
import { getCurrentUser } from "@/lib/auth";
import Group from "@/models/Group";

export async function createGroupExpense(data: GroupExpenseInput) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const group = await Group.findOne({
    _id: data.groupId,
    userId: user.id,
  });

  if (!group) {
    return {
      success: false,
      message: "Group not found",
    };
  }

  const expense = await GroupExpense.create({
    groupId: data.groupId,
    title: data.title,
    amount: data.amount,
    paidBy: data.paidBy,
    date: data.date,
    note: data.note,
  });

  return {
    success: true,
    expenseId: expense._id.toString(),
  };
}

//get group expenses =>
export async function getGroupExpenses(groupId: string) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const group = await Group.findOne({
    _id: groupId,
    userId: user.id,
  });

  if (!group) {
    return [];
  }

  const expenses = await GroupExpense.find({
    groupId,
  })
    .sort({ date: -1 })
    .lean();

  return expenses.map((expense) => ({
    id: expense._id.toString(),
    groupId: expense.groupId.toString(),
    title: expense.title,
    amount: expense.amount,
    paidBy: expense.paidBy,
    date: expense.date.toISOString(),
    note: expense.note ?? "",
  }));
}

//update the group expense ...
export async function updateGroupExpense(
  id: string,
  data: GroupExpenseInput
) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const group = await Group.findOne({
    _id: data.groupId,
    userId: user.id,
  });

  if (!group) {
    return {
      success: false,
      message: "Group not found",
    };
  }

  const expense = await GroupExpense.findOneAndUpdate(
    {
      _id: id,
      groupId: data.groupId,
    },
    {
      title: data.title,
      amount: data.amount,
      paidBy: data.paidBy,
      date: data.date,
      note: data.note,
    },
    { new: true }
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

//deletethe group expense ..
export async function deleteGroupExpense(id: string) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const expense = await GroupExpense.findById(id);

  if (!expense) {
    return {
      success: false,
      message: "Expense not found",
    };
  }

  const group = await Group.findOne({
    _id: expense.groupId,
    userId: user.id,
  });

  if (!group) {
    return {
      success: false,
      message: "Group not found",
    };
  }

  await GroupExpense.findByIdAndDelete(id);

  return {
    success: true,
  };
}

//get group expense by id..
export async function getGroupExpenseById(id: string) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const expense = await GroupExpense.findById(id).lean();

  if (!expense) {
    return null;
  }

  const group = await Group.findOne({
    _id: expense.groupId,
    userId: user.id,
  });

  if (!group) {
    return null;
  }

  return {
    id: expense._id.toString(),
    groupId: expense.groupId.toString(),
    title: expense.title,
    amount: expense.amount,
    paidBy: expense.paidBy,
    date: expense.date.toISOString(),
    note: expense.note ?? "",
  };
}