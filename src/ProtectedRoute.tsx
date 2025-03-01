import { AppRouteKey } from "./core/constants/routes";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./core/constants/queryKeys";
import { UserDto } from "./core/dto/user.dto";
import { Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  permission?: string;
  children: React.ReactNode;
}

const ProtectedRoute = ({ permission }: ProtectedRouteProps) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserDto | null>([queryKeys.user]);
  if (permission && !user?.permissions.includes(permission)) {
    AppRouteKey.notAuthorized.go();
  }
  return <Outlet />;
};

export default ProtectedRoute;
