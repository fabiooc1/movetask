import { getUserProjects } from "@/actions/projects/get-user-projects";
import { NewProjectButton } from "./_components/new-project-button";
import { ProjectsOverview } from "./_components/projects-overview";

export default async function DashboardPage() {
  const projectsPaginationData = await getUserProjects();

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projetos</h1>
          <p className="text-md">
            Gerencie seus projetos e acompanhe o progresso
          </p>
        </div>

        <NewProjectButton />
      </div>

      <ProjectsOverview initialProjectPaginationData={projectsPaginationData} />
    </div>
  );
}
