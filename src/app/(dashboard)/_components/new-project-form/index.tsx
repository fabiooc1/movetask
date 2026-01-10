import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { newProjectFormSchema, NewProjectFormValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequiredFormField } from "@/components/required-form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/actions/projects/create-project";

interface NewProjectFormProps {
  onSuccess?: () => void;
}

export function NewProjectForm({ onSuccess }: NewProjectFormProps) {
  const form = useForm<NewProjectFormValues>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      membersIds: [],
    },
  });

  async function handleOnNewProjectSubmit(values: NewProjectFormValues) {
    try {
      await createProject({
        name: values.name,
        description: values.description,
        membersIds: values.membersIds,
      });

      onSuccess?.();
    } catch {}
  }

  return (
    <form
      className="space-y-6"
      onSubmit={form.handleSubmit(handleOnNewProjectSubmit)}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nome do projeto <RequiredFormField />
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex: Refatoração da landing page"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do projeto</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Descreva brevemente o que é o projeto"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO: Pensar em alguma forma se o usuário selecionar os usuários do sistema para adicionar ao projeto */}
      </Form>

      <div className="flex justify-end">
        <Button type="submit">Criar projeto</Button>
      </div>
    </form>
  );
}
