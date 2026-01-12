"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import z from "zod";
import { prisma } from "@/lib/prisma";
import { UnathorizedError } from "../erros/UnathorizedError";
import { ForbiddenError } from "../erros/ForbiddenError";
import { ConflictError } from "../erros/ConflictError";
import { revalidatePath } from "next/cache";

const createTaskActionSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().max(5000).optional(),
  projectId: z.number().min(1).positive(),
  statusId: z.number().min(1).positive(),
  priorityId: z.number().min(1).positive(),
  assignedToId: z.string().optional(),
  deliveryDate: z.string().optional(),
});

type CreateTaskActionData = z.infer<typeof createTaskActionSchema>;

export async function createTaskAction(dto: CreateTaskActionData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnathorizedError();
  }

  const data = await createTaskActionSchema.parseAsync(dto);
  const project = await prisma.project.findUnique({
    where: { id: data.projectId },
    select: {
      owner: { select: { id: true } },
      members: { select: { userId: true } },
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const useIsProjectMember = project.members.some(
    (m) => m.userId === session.user.id
  );

  if (session.user.id !== project.owner.id && !useIsProjectMember) {
    throw new ForbiddenError();
  }

  const alreadyExistsTaskWithTitle = await prisma.task.findFirst({
    where: {
      projectId: data.projectId,
      title: data.title,
    },
  });

  if (alreadyExistsTaskWithTitle) {
    throw new ConflictError("title");
  }

  const [isValidStatus, isValidPriorityId, isValidAssignedTo] =
    await Promise.all([
      prisma.taskStatus.findUnique({
        where: { id: data.statusId },
      }),
      prisma.taskPriority.findUnique({
        where: { id: data.priorityId },
      }),
      prisma.user.findUnique({
        where: { id: data.assignedToId },
      }),
    ]);

  if (!isValidStatus) {
    throw new Error("Invalid statusId");
  }

  if (!isValidPriorityId) {
    throw new Error("Invalid priorityId");
  }

  if (data.assignedToId) {
    if (!isValidAssignedTo) {
      throw new Error("Invalid assignedToId");
    }

    const isAssignedUserProjectMember = project.members.some(
      (m) => m.userId === data.assignedToId
    );

    if (
      !isAssignedUserProjectMember &&
      project.owner.id !== data.assignedToId
    ) {
      throw new Error("assignedToId is not a member of the project");
    }
  }

  const createdTask = await prisma.$transaction(async (tx) => {
    const maxIndexTask = await tx.task.findFirst({
      where: {
        projectId: data.projectId,
        statusId: data.statusId,
      },
      select: {
        index: true,
      },
      orderBy: {
        index: "desc",
      },
    });

    const newTaskIndex = maxIndexTask ? maxIndexTask.index + 1 : 0;

    const taskData = {
      ...data,
      index: newTaskIndex,
      createdById: session.user.id,
    };

    return tx.task.create({
      data: taskData,
    });
  });

  revalidatePath("/projects/" + data.projectId.toString());
  return createdTask;
}
