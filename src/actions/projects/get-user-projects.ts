"use server";

import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageModel } from "@/models/page-model";
import { ProjectItemModel } from "@/models/project-item-model";
import { headers } from "next/headers";
import z from "zod";
import { UnathorizedError } from "../erros/UnathorizedError";

const getUserProjectsSchema = z.object({
  pageSize: z.coerce.number().positive().default(10),
  pageNumber: z.coerce.number().positive().default(1),
  projectName: z.string().optional(),
});

type GetUserProjectsProps = z.infer<typeof getUserProjectsSchema> | undefined;

export async function getUserProjects(
  dto?: GetUserProjectsProps
): Promise<PageModel<ProjectItemModel>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnathorizedError();
  }

  const { pageSize, pageNumber, projectName } =
    await getUserProjectsSchema.parseAsync(dto ?? {});

  let where: Prisma.ProjectWhereInput = {
    OR: [
      { ownerId: session.user.id },
      {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    ],
  };

  if (projectName) {
    where = {
      ...where,
      name: {
        contains: projectName,
        mode: "insensitive",
      },
    };
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        members: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        tasks: {
          select: {
            id: true,
            isCompleted: true,
          },
        },
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    }),
    prisma.project.count({ where }),
  ]);

  const mappedProjects = projects.map((project) => ({
    ...project,
    tasksAmount: project.tasks.length,
    tasksCompletedAmount: project.tasks.filter((task) => task.isCompleted)
      .length,
  }));

  return {
    data: mappedProjects,
    pageNumber,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total,
  };
}
