import { getProjectById } from "@/actions/projects/get-project-by-id";
import { BackButton } from "@/components/back-button";
import { NewTaskButton } from "../../_components/new-task-button";
import { getProjectTasksByStatus } from "@/actions/tasks/get-project-tasks-by-status";
import { TaskBoard } from "../../_components/task-board";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function ProjectPage(
  props: PageProps<"/projects/[projectId]">
) {
  const params = await props.params;
  const projectId = Number(params.projectId);
  const project = await getProjectById(projectId);
  const taskStatus = await getProjectTasksByStatus(projectId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-2">
          <BackButton callbackUrl="/" />

          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            {project.description && (
              <p className="text-md">{project.description}</p>
            )}
          </div>
        </div>

        <NewTaskButton projectId={projectId} />
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-6">
          {taskStatus.map((ts) => (
            <TaskBoard projectId={projectId} key={ts.id} status={ts} />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
