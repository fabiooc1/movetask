import z from "zod";
import { newProjectFormSchema } from "../new-project-form/schema";

export const editProjectFormSchema = newProjectFormSchema.partial();

export type EditProjectFormValues = z.infer<typeof editProjectFormSchema>;
