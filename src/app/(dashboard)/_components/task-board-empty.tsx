import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ListTodoIcon } from "lucide-react";

export function TaskBoardEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ListTodoIcon />
        </EmptyMedia>
        <EmptyTitle>Nenhuma tarefa</EmptyTitle>
        <EmptyDescription>
          Não há tarefas neste status no momento.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
