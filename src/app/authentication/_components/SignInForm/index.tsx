"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RequiredFormField } from "@/components/required-form-field";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { signInFormSchema, SignInFormValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function SignInForm() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleOnSignInFormSubmit(values: SignInFormValues) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/",
      fetchOptions: {
        onRequest: () => setIsAuthenticating(true),
        onError(ctx) {
            setIsAuthenticating(false)

            if (ctx.response.status === 401) {
                form.setError('email', {
                    message: 'Email ou senha incorretos.',
                })

                form.setError('password', {
                    message: 'Email ou senha incorretos.',
                })

                return;
            }

            toast.error("Ocorreu um erro ao tentar entrar. Tente novamente mais tarde.");
        },
      },
    });
  }

  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>Entrar na sua conta</CardTitle>
        <CardDescription>
          Insira suas credenciais para acessar sua conta.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(handleOnSignInFormSubmit)}
        >
          <Form {...form}>
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
                  <FormLabel className="flex justify-between">
                    <div>
                      Senha <RequiredFormField />
                    </div>

                    <Link
                      href="/authentication/forgot-password"
                      className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Digite sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>

          <div className="flex justify-end">
            <Button disabled={isAuthenticating} type="submit">
                {isAuthenticating ?? <Loader2 className="animate-spin" />} Entrar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
