"use client";

import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTaskStatus } from "@/hooks/use-get-task-status";

interface TaskStatusSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function TaskStatusSelect({ value, onChange }: TaskStatusSelectProps) {
  const { isLoading, data: status } = useGetTaskStatus();

  if (isLoading) {
    return <Skeleton className="w-full h-9" />;
  }

  if (!status) {
    return null;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione o status da tarefa" />
      </SelectTrigger>

      <SelectContent>
        {status.map((ts) => (
          <SelectItem key={ts.id} value={ts.id.toString()}>
            {ts.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
