import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProjectItemModel } from "@/models/project-item-model";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: ProjectItemModel;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleOnClickInProject = () => {
    router.push(`/projects/${project.id}`);
  };

  const progressValue =
    project.tasksAmount > 0
      ? Math.round((project.tasksCompletedAmount / project.tasksAmount) * 100)
      : 0;

  const displayedMembers = project.members?.slice(0, 3) ?? [];
  const extraMembers = Math.max(
    0,
    (project.members?.length ?? 0) - displayedMembers.length
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 text-foreground">
            <Button
              variant="link"
              className="p-0 text-left"
              onClick={handleOnClickInProject}
            >
              <CardTitle className="text-lg">{project.name}</CardTitle>
            </Button>

            {project.description && (
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            )}
          </div>

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
              <DropdownMenuItem>
                <PencilIcon className="mr-2 h-4 w-4" />
                <span>Editar</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                <TrashIcon className="mr-2 h-4 w-4" />
                <span>Deletar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Progresso</span>
          <span>{progressValue}%</span>
        </div>
        <Progress value={progressValue} />
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {displayedMembers.map((m) => {
            const initials =
              m.user.name
                ?.split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((n) => n[0]!.toUpperCase())
                .join("") || "U";
            return (
              <Avatar key={m.user.id} className="h-7 w-7 border">
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
            );
          })}
          {extraMembers > 0 && (
            <Avatar className="h-7 w-7 border bg-muted">
              <AvatarFallback className="text-xs">
                +{extraMembers}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <Badge variant="secondary" className="font-normal">
          {project.tasksCompletedAmount} / {project.tasksAmount} tarefa(s)
        </Badge>
      </CardFooter>
    </Card>
  );
}
