import { Progress } from "@/components/ui/progress";

interface ProjectProgressProps {
  pendingTasksAmount: number;
  completedTasksAmount: number;
}

export function ProjectProgress({
  pendingTasksAmount,
  completedTasksAmount,
}: ProjectProgressProps) {
  let progressValue = 0;

  const totalTasks = pendingTasksAmount + completedTasksAmount;

  if (totalTasks > 0) {
    const media = completedTasksAmount / totalTasks;
    progressValue = Math.round(media * 100);
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex gap-10 items-center justify-between text-sm text-muted-foreground">
        <span>Progresso</span>
        <span>{progressValue}%</span>
      </div>

      <Progress value={progressValue} />
    </div>
  );
}
