import { getProjectMembers } from "@/actions/projects/get-project-members";
import { ProjectMemberModel } from "@/models/project-member-model";
import { useQuery } from "@tanstack/react-query";

export function useGetProjectMembers(projectId: number) {
  return useQuery<ProjectMemberModel[]>({
    queryKey: ["project-members", projectId],
    queryFn: async () => {
      return await getProjectMembers(projectId);
    },
  });
}
