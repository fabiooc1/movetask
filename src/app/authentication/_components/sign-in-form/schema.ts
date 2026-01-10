import z from "zod";

export const signInFormSchema = z.object({
    email: z.email({ message: "Endereço de email inválido." }),
    password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
})

export type SignInFormValues = z.infer<typeof signInFormSchema>;