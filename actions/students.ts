"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getStudentProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      studentProfile: {
        include: {
          department: { select: { name: true, code: true } },
          advisor: { select: { firstName: true, lastName: true } },
        },
      },
    },
  });

  return user?.studentProfile ?? null;
}
