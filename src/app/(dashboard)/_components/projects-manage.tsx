"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ProjectItemModel } from "@/models/project-item-model";
import { SquareIcon } from "lucide-react";
import { NewProjectButton } from "./new-project-button";
import { ProjectCard } from "./project-card";

export type AvailableViewModes = "list" | "grid";

interface ProjectsManageProps {
  viewMode: AvailableViewModes;
  projects: ProjectItemModel[];
}

export function ProjectsManage({ viewMode, projects }: ProjectsManageProps) {
  if (projects.length === 0) {
    return (
      <Empty className="border border-dashed rounded-lg bg-muted/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SquareIcon />
          </EmptyMedia>

          <EmptyTitle>Nenhum projeto encontrado</EmptyTitle>
          <EmptyDescription>
            Comece criando seu primeiro projeto ou solicite acesso a um projeto
            existente.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <NewProjectButton />
        </EmptyContent>
      </Empty>
    );
  }

  const containerStyle =
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      : "flex flex-col gap-2";

  return (
    <div className={containerStyle}>
      {projects.map((p) => {
        if (viewMode === "grid") {
          return <ProjectCard key={p.id} project={p} />;
        }

        return <p key={p.id}>{p.name}</p>;
      })}
    </div>
  );
}
