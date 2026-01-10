import z from "zod";

export const newProjectFormSchema = z.object({
  name: z.string().min(3, "O nome do projeto deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  membersIds: z.array(z.uuid()).optional(),
});
export type NewProjectFormValues = z.infer<typeof newProjectFormSchema>;
