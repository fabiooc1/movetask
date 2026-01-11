import { Card, CardHeader } from "@/components/ui/card";
import { TaskItemModel } from "@/models/task-item-model";

interface TaskCardProps {
  task: TaskItemModel;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card>
      <CardHeader>{task.title}</CardHeader>
    </Card>
  );
}
