import { getUsers } from "@/actions/users/get-users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface UseGetUsersProps {
  userName?: string;
  includeUserIds?: string[];
}

export function useGetUsers(dto: UseGetUsersProps) {
  return useQuery({
    queryKey: ["users", dto.userName, dto.includeUserIds],
    queryFn: async () => {
      return await getUsers({
        pageNumber: 1,
        pageSize: 10,
        userName: dto.userName,
        includeUserIds: dto.includeUserIds,
      });
    },
    placeholderData: keepPreviousData,
  });
}
