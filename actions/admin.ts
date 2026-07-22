"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getAdminStats() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const [totalStudents, totalFaculty, totalCourses, totalDepartments, recentAuditLogs] =
    await Promise.all([
      db.studentProfile.count(),
      db.facultyProfile.count(),
      db.course.count({ where: { isActive: true } }),
      db.department.count(),
      db.auditLog.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { firstName: true, lastName: true } } },
      }),
    ]);

  return {
    totalStudents,
    totalFaculty,
    totalCourses,
    totalDepartments,
    recentAuditLogs,
  };
}

export async function getDepartments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const departments = await db.department.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          courses: true,
          studentProfiles: true,
          facultyProfiles: true,
        },
      },
      head: {
        select: { firstName: true, lastName: true },
      },
    },
  });

  return departments;
}

export async function createDepartment(data: { name: string; code: string; description?: string }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const department = await db.department.create({ data });
  revalidatePath("/dashboard/admin/departments");
  return department;
}

export async function deleteDepartment(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.department.delete({ where: { id } });
  revalidatePath("/dashboard/admin/departments");
}