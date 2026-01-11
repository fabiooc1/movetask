"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskBoardDot } from "./task-board-dot";
import { NewTaskButton } from "./new-task-button";
import { Badge } from "@/components/ui/badge";
import { TaskBoardEmpty } from "./task-board-empty";
import { TaskCard } from "./task-card";
import { TaskProjectStatusModel } from "@/models/task-project-status-model";

interface TaskBoardProps {
  projectId: number;
  status: TaskProjectStatusModel;
}

export function TaskBoard({ projectId, status }: TaskBoardProps) {
  let cardContent = <TaskBoardEmpty />;

  if (status.tasks.length > 0) {
    cardContent = (
      <>
        {status.tasks.map((t) => (
          <CardContent key={t.id}>
            <TaskCard task={t} />
          </CardContent>
        ))}
      </>
    );
  }

  return (
    <Card className="w-107.5 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <TaskBoardDot color={status.color} />
          {status.name}
          <Badge>{status.tasks.length}</Badge>
        </CardTitle>

        <NewTaskButton
          buttonLayout="icon"
          projectId={projectId}
          statusId={status.id}
        />
      </CardHeader>

      {cardContent}
    </Card>
  );
}
