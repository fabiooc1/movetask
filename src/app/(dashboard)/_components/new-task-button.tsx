"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { NewTaskForm } from "./new-task-form";

interface NewTaskButtonProps {
  projectId: number;
  statusId?: number;
  buttonLayout?: "icon" | "text";
}

export function NewTaskButton({
  projectId,
  statusId,
  buttonLayout = "text",
}: NewTaskButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={buttonLayout === "text" ? "default" : "ghost"}
          size={buttonLayout === "text" ? "default" : "icon"}
        >
          {buttonLayout === "text" ? (
            <>
              <PlusIcon /> Nova tarefa
            </>
          ) : (
            <PlusIcon />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova tarefa</DialogTitle>
          <DialogDescription>
            Aqui você pode criar uma nova tarefa para o projeto.
          </DialogDescription>
        </DialogHeader>

        <NewTaskForm projectId={projectId} statusId={statusId} />
      </DialogContent>
    </Dialog>
  );
}
