"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListIcon, SearchIcon, SquareDashedIcon } from "lucide-react";
import { AvailableViewModes, ProjectsManage } from "./projects-manage";
import { useState } from "react";
import { PageModel } from "@/models/page-model";
import { ProjectItemModel } from "@/models/project-item-model";

interface ProjectsOverviewProps {
  initialProjectPaginationData: PageModel<ProjectItemModel>;
}

export function ProjectsOverview({
  initialProjectPaginationData,
}: ProjectsOverviewProps) {
  const [searchByProjectName, setSearchByProjectName] = useState("");
  const [viewMode, setViewMode] = useState<AvailableViewModes>("grid");

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <InputGroup className="w-md">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            value={searchByProjectName}
            onChange={(event) => setSearchByProjectName(event.target.value)}
            placeholder="Busque por nome"
          />
        </InputGroup>

        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as AvailableViewModes)}
        >
          <TabsList>
            <TabsTrigger value="grid">
              <SquareDashedIcon />
            </TabsTrigger>

            <TabsTrigger value="list">
              <ListIcon />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ProjectsManage
        viewMode={viewMode}
        projects={initialProjectPaginationData.data}
      />
    </div>
  );
}
