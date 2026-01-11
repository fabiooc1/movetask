import { Badge } from "@/components/ui/badge";

interface ProjectTasksBadgeProps {
  pendingTasksAmount: number;
  completedTasksAmount: number;
}

export function ProjectTasksBadge({
  pendingTasksAmount,
  completedTasksAmount,
}: ProjectTasksBadgeProps) {
  const totalTasks = pendingTasksAmount + completedTasksAmount;

  return (
    <Badge variant="secondary" className="py-2 px-3 rounded-md">
      {pendingTasksAmount}/{totalTasks} tarefa(s)
    </Badge>
  );
}
