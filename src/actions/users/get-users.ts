"use server";

import { auth } from "@/lib/auth";
import { PageModel } from "@/models/page-model";
import { UserItemModel } from "@/models/user-item-model";
import { headers } from "next/headers";
import z from "zod";
import { UnathorizedError } from "../erros/UnathorizedError";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const getUsersSchema = z.object({
  pageSize: z.coerce.number().positive().default(10),
  pageNumber: z.coerce.number().positive().default(1),
  userName: z.string().optional(),
  includeUserIds: z.array(z.uuid()).optional(),
});

type GetUsersProps = z.infer<typeof getUsersSchema> | undefined;

export async function getUsers(
  dto?: GetUsersProps
): Promise<PageModel<UserItemModel>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnathorizedError();
  }

  const { pageSize, pageNumber, userName, includeUserIds } =
    await getUsersSchema.parseAsync(dto ?? {});

  const where: Prisma.UserWhereInput = {
    NOT: {
      id: session.user.id,
    },
  };

  if (userName) {
    where.name = {
      contains: userName,
      mode: "insensitive",
    };
  }

  if (includeUserIds && includeUserIds.length > 0) {
    where.id = {
      in: includeUserIds,
    };
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    pageNumber,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total,
  };
}
