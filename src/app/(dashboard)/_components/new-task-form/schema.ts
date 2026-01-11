import z from "zod";

export const newTaskFormSchema = z.object({
  title: z
    .string()
    .min(1, "O título é obrigatório")
    .min(3, "O título deve ter no mínimo 3 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .optional(),
  assignedToIdValue: z.string().optional(),
  deliveryDate: z.string().optional(),
  priorityIdValue: z.string().min(1, "A prioridade é obrigatória"),
  statusIdValue: z.string().min(1, "O status é obrigatório"),
});

export type NewTaskFormValues = z.infer<typeof newTaskFormSchema>;
