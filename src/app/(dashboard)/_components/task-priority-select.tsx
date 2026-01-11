"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTaskPriorities } from "@/hooks/use-get-task-priorities";

interface TaskPrioritySelectProps {
  value: string;
  onChange: (priorityIdValue: string) => void;
}

export function TaskPrioritySelect({
  value,
  onChange,
}: TaskPrioritySelectProps) {
  const { isLoading, data: priorities } = useGetTaskPriorities();

  if (isLoading) {
    return <Skeleton className="w-full h-9" />;
  }

  if (!priorities) {
    return null;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione a prioridade" />
      </SelectTrigger>

      <SelectContent>
        {priorities.map((priority) => (
          <SelectItem key={priority.id} value={priority.id.toString()}>
            {priority.level}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
