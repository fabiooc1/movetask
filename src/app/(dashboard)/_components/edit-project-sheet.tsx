"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditProjectForm } from "./edit-project-form";
import { ProjectItemModel } from "@/models/project-item-model";

interface EditProjectSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  project: ProjectItemModel;
}

export function EditProjectSheet({
  isOpen,
  setIsOpen,
  project,
}: EditProjectSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Projeto</SheetTitle>
          <SheetDescription>
            Realize as alterações nas informações do projeto aqui.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <EditProjectForm
            project={project}
            onSuccess={() => setIsOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
