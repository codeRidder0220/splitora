"use server";

import { connectDB } from "@/lib/mongodb";
import Group from "@/models/Group";
import type { GroupInput } from "@/types/group";
import GroupExpense from "@/models/GroupExpense";
import { getCurrentUser } from "@/lib/auth";

export async function createGroup(data: GroupInput) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const group = await Group.create({
    userId: user.id,
    name: data.name,
    members: data.members,
  });

  return {
    success: true,
    groupId: group._id.toString(),
  };
}

//now get groups=>
export async function getGroups() {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const groups = await Group.find({userId: user.id})
    .sort({ createdAt: -1 })
    .lean();

  return groups.map((group) => ({
    id: group._id.toString(),
    name: group.name,
    members: group.members,
  }));
}

//get group by id =>
export async function getGroupById(id: string) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const group = await Group.findOne({
    _id: id,
    userId: user.id,
  }).lean();

  if (!group) {
    return null;
  }

  return {
    id: group._id.toString(),
    name: group.name,
    members: group.members,
  };
}

//delete groups=>
export async function deleteGroup(id: string) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in",
    };
  }

  const group = await Group.findOneAndDelete({
    _id: id,
    userId: user.id,
  });

  if (!group) {
    return {
      success: false,
      message: "Group not found",
    };
  }

  await GroupExpense.deleteMany({
    groupId: id,
  });

  return {
    success: true,
  };
}