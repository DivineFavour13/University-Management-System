"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import type { UserRole } from "@/types";

// Get all users from DB
export async function getUsers() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      studentProfile: { select: { status: true, studentId: true } },
      facultyProfile: { select: { facultyId: true } },
    },
  });

  return users;
}

// Get user stats
export async function getUserStats() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const [total, students, suspended] = await Promise.all([
    db.user.count(),
    db.studentProfile.count({ where: { status: "ACTIVE" } }),
    db.studentProfile.count({ where: { status: "SUSPENDED" } }),
  ]);

  return { total, active: students, suspended };
}

// Change a user's role
export async function updateUserRole(targetUserId: string, role: UserRole) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Update in DB
  await db.user.update({
    where: { id: targetUserId },
    data: { role },
  });

  // Get clerkId to update Clerk metadata
  const user = await db.user.findUnique({
    where: { id: targetUserId },
    select: { clerkId: true },
  });

  if (user) {
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.clerkId, {
      publicMetadata: { role },
    });
  }

  revalidatePath("/dashboard/admin/users");
}

// Suspend a student
export async function suspendStudent(targetUserId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.studentProfile.updateMany({
    where: { userId: targetUserId },
    data: { status: "SUSPENDED" },
  });

  revalidatePath("/dashboard/admin/users");
}

// Activate a student
export async function activateStudent(targetUserId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.studentProfile.updateMany({
    where: { userId: targetUserId },
    data: { status: "ACTIVE" },
  });

  revalidatePath("/dashboard/admin/users");
}
