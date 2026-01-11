"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewProjectForm } from "./new-project-form";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NewProjectButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon /> Novo projeto
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Novo Projeto</SheetTitle>
          <SheetDescription>
            Crie um novo projeto para organizar suas tarefas
          </SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <NewProjectForm onSuccess={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
