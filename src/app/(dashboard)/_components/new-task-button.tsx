"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

interface NewTaskButtonProps {
  buttonLayout?: "icon" | "text";
}

export function NewTaskButton({ buttonLayout = "text" }: NewTaskButtonProps) {
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
    </Dialog>
  );
}
