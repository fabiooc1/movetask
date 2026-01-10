"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import z from "zod";
import { UnathorizedError } from "../erros/UnathorizedError";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const createProjectSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  membersIds: z.array(z.uuid()).optional(),
});

type CreateProjectProps = z.infer<typeof createProjectSchema>;

export async function createProject(dto: CreateProjectProps): Promise<void> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new UnathorizedError();
  }

  const { name, description, membersIds } =
    await createProjectSchema.parseAsync(dto);

  await prisma.project.create({
    data: {
      name,
      description,
      ownerId: session.user.id,
      members: {
        create: membersIds?.map((userId) => ({ userId })) || [],
      },
    },
    select: {
      id: true,
    },
  });

  revalidatePath("/dashboard/projects");
}
