import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../core/constants/queryKeys";
import { UserDto } from "../../core/dto/user.dto";
import { AppRouteKey } from "../../core/constants/routes";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.setQueryData<UserDto>([queryKeys.user], {
        name: "John Doe",
        permissions: ["VIEW_POSTS", "VIEW_COMMENTS"],
      });
      AppRouteKey.home.go();
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      queryClient.setQueryData<UserDto | null>([queryKeys.user], null);
    },
  });
};
