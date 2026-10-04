"use server";

import { connectDB } from "@/lib/mongodb";
import Group from "@/models/Group";
import type { GroupInput } from "@/types/group";
import GroupExpense from "@/models/GroupExpense";

export async function createGroup(data: GroupInput) {
  await connectDB();

  const group = await Group.create({
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

  const groups = await Group.find()
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

  const group = await Group.findById(id).lean();

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

  await GroupExpense.deleteMany({
    groupId: id,
  });

  const group = await Group.findByIdAndDelete(id);

  if (!group) {
    return {
      success: false,
      message: "Group not found",
    };
  }

  return {
    success: true,
  };
}