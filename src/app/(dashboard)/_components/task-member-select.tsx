"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProjectMembers } from "@/hooks/use-get-project-members";

interface TaskMemberSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  projectId: number;
}

export function TaskMemberSelect({
  value,
  onChange,
  projectId,
}: TaskMemberSelectProps) {
  const { isLoading, data: members } = useGetProjectMembers(projectId);

  if (isLoading) {
    return <Skeleton className="w-full h-9" />;
  }

  if (!members) {
    return null;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione o membro" />
      </SelectTrigger>

      <SelectContent>
        {members.map((member) => (
          <SelectItem key={member.user.id} value={member.user.id}>
            {member.user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
