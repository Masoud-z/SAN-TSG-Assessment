import { useTranslation } from "react-i18next";
import Card from "../../components/card/Card";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { UserDto } from "../../core/dto/user.dto";
import { toast } from "react-toastify";
import { AppRouteKey } from "../../core/constants/routes";
import { useLogin } from "../../hooks/custom/useAuth";
import SpinningCircularLoader from "../../components/SpinningCircularLoader/SpinningCircularLoader";

const Login = () => {
  const { t } = useTranslation("main");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useLogin();
  useEffect(() => {
    const user = queryClient.getQueryData<UserDto>(["user"]);
    if (user) {
      toast.success(t("youLoggedIn"));
      AppRouteKey.home.go();
    }
  }, []);
  
  function loginUser() {
    mutate();
  }
  return (
    <div className="w-full h-lvh flex justify-center items-center">
      <Card className="w-72 h-72 flex flex-col justify-center items-center gap-4">
        <div className="w-4.5 h-4.5">
          {isPending && <SpinningCircularLoader className="w-4.5 h-4.5" />}
        </div>
        <button
          disabled={isPending}
          className="btn-primary flex justify-center items-center gap-2"
          onClick={loginUser}
        >
          {t("login")}
        </button>
      </Card>
    </div>
  );
};

export default Login;
