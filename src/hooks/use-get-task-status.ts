import { getTaskStatus } from "@/actions/tasks/get-task-status";
import { TaskStatusModel } from "@/models/task-status-model";
import { useQuery } from "@tanstack/react-query";

export function useGetTaskStatus() {
  return useQuery<TaskStatusModel[]>({
    queryKey: ["task-status"],
    queryFn: async () => {
      return await getTaskStatus();
    },
  });
}
