"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UnathorizedError } from "../erros/UnathorizedError";
import { prisma } from "@/lib/prisma";
import { TaskProjectStatusModel } from "@/models/task-project-status-model";

export async function getProjectTasksByStatus(
  projectId: number
): Promise<TaskProjectStatusModel[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnathorizedError();
  }

  const status = await prisma.taskStatus.findMany({
    select: {
      id: true,
      name: true,
      color: true,
      tasks: {
        where: {
          projectId,
        },
        select: {
          id: true,
          title: true,
          description: true,
          isCompleted: true,
          index: true,
          deliveryDate: true,
          priority: {
            select: {
              id: true,
              level: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          index: "asc",
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return status;
}
