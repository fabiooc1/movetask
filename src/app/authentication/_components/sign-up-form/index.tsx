"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { RequiredFormField } from "@/components/required-form-field";

import { signUpFormSchema, SignUpFormValues } from "./schema";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
    const router = useRouter();
    const [isRegistering, setIsRegistering] = useState(false);

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    async function handleOnSignUpFormSubmit(values: SignUpFormValues) {
        await authClient.signUp.email({
            email: values.email,
            password: values.password,
            name: values.fullName,
            fetchOptions: {
                onRequest: () => setIsRegistering(true),
                onSuccess: () => router.push("/"),
                onError(ctx) {
                    setIsRegistering(false);

                    if (ctx.response?.status === 409) {
                        form.setError("email", {
                            message: "Este email já está em uso.",
                        });
                        return;
                    }

                    toast.error("Ocorreu um erro ao criar sua conta. Tente novamente mais tarde.");
                },
            },
        });
    }

    return (
        <Card className="w-sm">
            <CardHeader>
                <CardTitle>Crie sua conta</CardTitle>
                <CardDescription>Comece a gerenciar suas tarefas hoje mesmo.</CardDescription>
            </CardHeader>

            <CardContent>
                <form className="space-y-6" onSubmit={form.handleSubmit(handleOnSignUpFormSubmit)}>
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Nome completo <RequiredFormField />
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu nome completo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email <RequiredFormField />
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Senha <RequiredFormField />
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="Crie uma senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>

                    <div className="flex justify-end">
                        <Button disabled={isRegistering} type="submit">
                            {isRegistering ?? <Loader2 className="animate-spin" />}
                            Criar conta
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}