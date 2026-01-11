"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UnathorizedError } from "../erros/UnathorizedError";
import { prisma } from "@/lib/prisma";
import { ForbiddenError } from "../erros/ForbiddenError";

export async function getProjectById(projectId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnathorizedError();
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      tasks: true,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.ownerId !== session.user.id) {
    throw new ForbiddenError();
  }

  return project;
}
