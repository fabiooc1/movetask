import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

import { ProjectItemModel } from "@/models/project-item-model";
import { useRouter } from "next/navigation";
import { ProjectProgress } from "./project-progress";
import { ProjectMembers } from "./project-members";
import { ProjectActionsMenu } from "./project-actions-menu";
import { ProjectTasksBadge } from "./project-tasks-badge";

interface ProjectCardProps {
  project: ProjectItemModel;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleOnClickInProject = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <Card className="flex flex-col justify-between transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <Button
              variant="link"
              className="h-auto p-0 text-left font-semibold text-lg text-foreground whitespace-normal"
              onClick={handleOnClickInProject}
            >
              {project.name}
            </Button>

            <div className="h-10">
              {project.description ?? (
                <CardDescription className="line-clamp-2 text-sm">
                  {project.description}
                </CardDescription>
              )}
            </div>
          </div>

          <ProjectActionsMenu project={project} />
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <ProjectProgress
          completedTasksAmount={project.tasksCompletedAmount}
          pendingTasksAmount={project.tasksPendingAmount}
        />
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-0">
        <ProjectMembers members={project.members} />

        <ProjectTasksBadge
          completedTasksAmount={project.tasksCompletedAmount}
          pendingTasksAmount={project.tasksPendingAmount}
        />
      </CardFooter>
    </Card>
  );
}
