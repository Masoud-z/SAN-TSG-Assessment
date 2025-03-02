import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../core/constants/queryKeys";
import { UserDto } from "../../core/dto/user.dto";
import { AppRouteKey } from "../../core/constants/routes";
import { toast } from "react-toastify";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      queryClient.setQueryData<UserDto>([queryKeys.user], {
        name: "John Doe",
        permissions: ["VIEW_POSTS", "VIEW_COMMENTS"],
      });
      AppRouteKey.home.go();
    },
    onError: () => {
      toast.error("Login failed, something went wrong!");
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
    onError: () => {
      toast.error("Logout failed, something went wrong!");
    },
  });
};
