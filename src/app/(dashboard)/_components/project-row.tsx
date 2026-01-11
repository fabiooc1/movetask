"use client";

import { Button } from "@/components/ui/button";
import { ProjectItemModel } from "@/models/project-item-model";
import { ProjectActionsMenu } from "./project-actions-menu";
import { ProjectProgress } from "./project-progress";
import { ProjectMembers } from "./project-members";
import { ProjectTasksBadge } from "./project-tasks-badge";
import { Card } from "@/components/ui/card";

interface ProjectRowProps {
  project: ProjectItemModel;
}

export function ProjectRow({ project }: ProjectRowProps) {
  function handleOnClickInProject() {}

  return (
    <Card className="p-4 transition-colors hover:bg-muted/40">
      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col gap-1 flex-1">
          <Button
            variant="link"
            className="w-fit h-auto p-0 text-left justify-start font-semibold text-lg text-foreground"
            onClick={handleOnClickInProject}
          >
            {project.name}
          </Button>

          {project.description && (
            <p className="line-clamp-1 text-sm text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-6 ">
          <ProjectProgress
            completedTasksAmount={project.tasksCompletedAmount}
            pendingTasksAmount={project.tasksPendingAmount}
          />

          <ProjectMembers members={project.members} />

          <ProjectTasksBadge
            completedTasksAmount={project.tasksCompletedAmount}
            pendingTasksAmount={project.tasksPendingAmount}
          />

          <ProjectActionsMenu project={project} />
        </div>
      </div>
    </Card>
  );
}
