"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UnathorizedError } from "../erros/UnathorizedError";
import { prisma } from "@/lib/prisma";
import { TaskStatusModel } from "@/models/task-status-model";

export async function getTaskStatus(): Promise<TaskStatusModel[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnathorizedError();
  }

  return prisma.taskStatus.findMany({
    select: {
      id: true,
      name: true,
      color: true,
    },
  });
}
