import { getProjectById } from "@/actions/projects/get-project-by-id";
import { BackButton } from "@/components/back-button";
import { NewTaskButton } from "../../_components/new-task-button";
import { getTaskStatus } from "@/actions/tasks/get-task-status";
import { TaskBoard } from "../../_components/task-board";

export default async function ProjectPage(
  props: PageProps<"/projects/[projectId]">
) {
  const params = await props.params;
  const projectId = Number(params.projectId);
  const project = await getProjectById(projectId);
  const taskStatus = await getTaskStatus();

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

        <NewTaskButton />
      </div>

      <div className="flex gap-4 justify-between">
        {taskStatus.map((ts) => (
          <TaskBoard key={ts.id} status={ts} />
        ))}
      </div>
    </div>
  );
}
