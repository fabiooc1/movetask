"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskStatusModel } from "@/models/task-status-model";
import { TaskBoardDot } from "./task-board-dot";
import { NewTaskButton } from "./new-task-button";

interface TaskBoardProps {
  status: TaskStatusModel;
}

export function TaskBoard({ status }: TaskBoardProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <TaskBoardDot color={status.color} />
          {status.name}
        </CardTitle>

        <NewTaskButton buttonLayout="icon" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3 overflow-y-auto"></CardContent>
    </Card>
  );
}
