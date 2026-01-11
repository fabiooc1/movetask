"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UnathorizedError } from "../erros/UnathorizedError";
import { prisma } from "@/lib/prisma";
import { TaskPriorityModel } from "@/models/task-priority-model";

export async function getTaskPriorities(): Promise<TaskPriorityModel[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnathorizedError();
  }

  return prisma.taskPriority.findMany({
    select: {
      id: true,
      level: true,
    },
  });
}
