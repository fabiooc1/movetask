import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { editProjectFormSchema, EditProjectFormValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MemberSelect } from "@/components/member-select";
import { ProjectItemModel } from "@/models/project-item-model";
import { Button } from "@/components/ui/button";
import { editProject } from "@/actions/projects/edit-project";
import { ConflictError } from "@/actions/erros/ConflictError";

interface EditProjectFormProps {
  onSuccess?: () => void;
  project: ProjectItemModel;
}

export function EditProjectForm({ project, onSuccess }: EditProjectFormProps) {
  const form = useForm<EditProjectFormValues>({
    resolver: zodResolver(editProjectFormSchema),
    defaultValues: {
      name: project.name,
      description: project.description ?? "",
      membersIds: project.members.map((member) => member.user.id),
    },
  });

  const { isDirty } = form.formState;

  async function handleOnEditProjectSubmit(values: EditProjectFormValues) {
    try {
      const dataToUpdate: {
        name?: string;
        description?: string;
        membersIds?: string[];
      } = {};

      if (values.name !== project.name) {
        dataToUpdate["name"] = values.name;
      }

      if (values.description !== project.description) {
        if (values.description !== "") {
          dataToUpdate["description"] = values.description;
        }
      }

      if (
        JSON.stringify(values.membersIds) !==
        JSON.stringify(project.members.map((m) => m.user.id))
      ) {
        dataToUpdate["membersIds"] = values.membersIds;
      }

      await editProject(project.id, dataToUpdate);
      onSuccess?.();
    } catch (error) {
      if (error instanceof ConflictError) {
        form.setError("name", {
          message: "Já existe um projeto com esse nome.",
        });

        return;
      }
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={form.handleSubmit(handleOnEditProjectSubmit)}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do projeto</FormLabel>

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

        <FormField
          control={form.control}
          name="membersIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membros do projeto</FormLabel>
              <MemberSelect {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>

      <div className="flex justify-end">
        <Button type="submit" disabled={!isDirty}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
