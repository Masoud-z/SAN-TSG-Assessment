import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { UserDto } from "../dto/user.dto";

export default function useCheckPermission(requiredPermission: string) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserDto | null>([queryKeys.user]);
  return !!user?.permissions.includes(requiredPermission);
}
