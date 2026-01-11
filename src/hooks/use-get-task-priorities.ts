import { getTaskPriorities } from "@/actions/tasks/get-task-priorities";
import { TaskPriorityModel } from "@/models/task-priority-model";
import { useQuery } from "@tanstack/react-query";

export function useGetTaskPriorities() {
  return useQuery<TaskPriorityModel[]>({
    queryKey: ["task-priorities"],
    queryFn: async () => {
      return await getTaskPriorities();
    },
  });
}
