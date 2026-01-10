import { z } from "zod";

export const signUpFormSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "O nome completo deve ter ao menos 3 caracteres." })
    .max(120, { message: "O nome completo não pode exceder 120 caracteres." }),
  email: z
    .email({ message: "Informe um email válido." })
    .max(254, { message: "Email muito longo." }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter ao menos 8 caracteres." })
    .max(128, { message: "A senha não pode exceder 128 caracteres." }),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
