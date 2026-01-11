"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectItemModel } from "@/models/project-item-model";
import { MoreHorizontalIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { EditProjectSheet } from "./edit-project-sheet";

interface ProjectActionsMenuProps {
  project: ProjectItemModel;
}

export function ProjectActionsMenu({ project }: ProjectActionsMenuProps) {
  const [isOpenEditProjectSheet, setIsOpenEditProjectSheet] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            aria-label="Abrir menu"
          >
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsOpenEditProjectSheet(true)}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProjectSheet
        project={project}
        isOpen={isOpenEditProjectSheet}
        setIsOpen={setIsOpenEditProjectSheet}
      />
    </>
  );
}
