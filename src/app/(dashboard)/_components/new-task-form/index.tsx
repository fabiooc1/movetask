import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { newTaskFormSchema, NewTaskFormValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequiredFormField } from "@/components/required-form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TaskPrioritySelect } from "../task-priority-select";
import { Button } from "@/components/ui/button";
import { TaskMemberSelect } from "../task-member-select";
import { TaskStatusSelect } from "../task-status-select";

interface NewTaskFormProps {
  projectId: number;
  statusId?: number;
  onSuccess?: () => void;
}

export function NewTaskForm({
  projectId,
  statusId,
  onSuccess,
}: NewTaskFormProps) {
  const form = useForm<NewTaskFormValues>({
    resolver: zodResolver(newTaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      deliveryDate: undefined,
      priorityIdValue: undefined,
      assignedToIdValue: undefined,
      statusIdValue: statusId ? statusId.toString() : "",
    },
  });

  async function handleOnNewTaskSubmit(data: NewTaskFormValues) {
    try {
      await createTaskAction();
      onSuccess?.();
    } catch {}
  }

  return (
    <form
      className="space-y-6"
      onSubmit={form.handleSubmit(handleOnNewTaskSubmit)}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Título <RequiredFormField />
              </FormLabel>

              <FormControl>
                <Input placeholder="Criar uma nova tarefa" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="statusIdValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Status <RequiredFormField />
              </FormLabel>

              <TaskStatusSelect {...field} />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>

              <FormControl>
                <Textarea placeholder="Descrição da tarefa" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start justify-between gap-6">
          <FormField
            control={form.control}
            name="priorityIdValue"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Prioridade <RequiredFormField />
                </FormLabel>

                <TaskPrioritySelect {...field} />

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Prazo de entrega</FormLabel>

                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="assignedToIdValue"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designar a</FormLabel>
              <FormDescription>
                Apenas membros adicionados ao projeto podem ser designados
              </FormDescription>

              <TaskMemberSelect projectId={projectId} {...field} />
            </FormItem>
          )}
        />
      </Form>

      <div className="flex justify-end">
        <Button type="submit">Criar tarefa</Button>
      </div>
    </form>
  );
}
