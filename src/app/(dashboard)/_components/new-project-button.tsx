"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { NewProjectForm } from "./new-project-form";
import { useState } from "react";

export function NewProjectButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> Novo projeto
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
          <DialogDescription>
            Crie um novo projeto para organizar suas tarefas
          </DialogDescription>
        </DialogHeader>

        <NewProjectForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
