import { ProjectItemMemberModel } from "@/models/project-item-model";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";

interface ProjectMembersProps {
  members: ProjectItemMemberModel[];
}

export function ProjectMembers({ members }: ProjectMembersProps) {
  if (members.length === 0) {
    return <div className="flex flex-2"></div>;
  }

  return (
    <div className="flex -space-x-2">
      {members.slice(0, 3).map((m) => (
        <Avatar key={m.user.id} className="h-8 w-8">
          <AvatarFallback>{m.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
