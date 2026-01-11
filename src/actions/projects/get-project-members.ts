"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UnathorizedError } from "../erros/UnathorizedError";
import { prisma } from "@/lib/prisma";

export async function getProjectMembers(projectId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnathorizedError();
  }

  const [project, members] = await Promise.all([
    prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        createdAt: true,
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    }),
    prisma.projectUser.findMany({
      where: {
        projectId,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        joinedAt: true,
      },
    }),
  ]);

  if (!project) {
    throw new Error("Project not found");
  }

  const projectOwnerFormat = {
    user: project.owner,
    joinedAt: project.createdAt,
  };

  const projectMembers = [projectOwnerFormat, ...members];
  return projectMembers;
}
