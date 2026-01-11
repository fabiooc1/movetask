"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import z from "zod";
import { UnathorizedError } from "../erros/UnathorizedError";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ForbiddenError } from "../erros/ForbiddenError";
import { ConflictError } from "../erros/ConflictError";
import { createProjectSchema } from "./create-project.schema";
import { Prisma } from "@/generated/prisma/client";

const editProjectSchema = createProjectSchema.partial();

type EditProjectProps = z.infer<typeof editProjectSchema>;

export async function editProject(
  projectId: number,
  dto: EditProjectProps
): Promise<void> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnathorizedError();
  }

  const { name, description, membersIds } = await editProjectSchema.parseAsync(
    dto
  );

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { ownerId: true },
  });

  if (!project || project.ownerId !== session.user.id) {
    throw new ForbiddenError();
  }

  if (name !== undefined) {
    const existProjectWithSameName = await prisma.project.findFirst({
      where: {
        name,
        ownerId: session.user.id,
        id: { not: projectId },
      },
      select: { id: true },
    });

    if (existProjectWithSameName) {
      throw new ConflictError("name");
    }
  }

  const data: Prisma.ProjectUpdateInput = {};

  if (name !== undefined) {
    data.name = name;
  }

  if (description !== undefined) {
    data.description = description;
  }

  if (membersIds) {
    data.members = {
      deleteMany: {},
      create: membersIds.map((memberId) => ({
        userId: memberId,
      })),
    };
  }

  if (Object.keys(data).length === 0) {
    return;
  }

  await prisma.project.update({
    where: { id: projectId },
    data,
  });

  revalidatePath("/dashboard/projects");
}
