import { useTranslation } from "react-i18next";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppRouteKey, setNavigator } from "../../core/constants/routes";
import { useQueryClient } from "@tanstack/react-query";
import { UserDto } from "../../core/dto/user.dto";
import { useState, useLayoutEffect } from "react";
import { queryKeys } from "../../core/constants/queryKeys";
import { useLogout } from "../../hooks/custom/useAuth";

const getPreferredTheme = () => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode) {
    return darkMode === "true";
  } else return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const Layout = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation("main");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: mutateLogout, isPending } = useLogout();
  const user = queryClient.getQueryData<UserDto | null>([queryKeys.user]);

  const [darkMode, setDarkMode] = useState(getPreferredTheme());

  useLayoutEffect(() => {
    setNavigator(navigate);
    setDocumentTheme(darkMode);
    const lan = localStorage.getItem("lan");
    if (lan && lan !== language) changeLanguage(lan);
  }, []);

  function setDocumentTheme(darkThem: boolean) {
    if (darkThem) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleDarkMode() {
    setDarkMode((prev) => {
      const newState = !prev;
      setDocumentTheme(newState);
      localStorage.setItem("darkMode", newState.toString());
      return newState;
    });
  }

  function setLanguage(lan: "en" | "tr") {
    changeLanguage(lan);
    localStorage.setItem("lan", lan);
  }

  return (
    <div className="w-full min-h-screen ">
      <header className="w-full flex justify-between items-center mb-1 px-5 py-3 shadow-md dark:shadow-amber-50">
        <h2>
          <Link to={AppRouteKey.home.get()}>{t("assignment")}</Link>
        </h2>
        <div className="flex justify-center items-center gap-4">
          <button onClick={toggleDarkMode} className="btn">
            {darkMode ? t("lightMode") : t("darkMode")}
          </button>
          <button
            disabled={isPending}
            className="btn w-20"
            onClick={() => {
              if (user) {
                mutateLogout();
              } else {
                AppRouteKey.login.go();
              }
            }}
          >
            {user ? t("logout") : t("login")}
          </button>
          <div className="flex justify-center items-center gap-2 hover:cursor-default">
            <button
              disabled={language === "en"}
              className="disabled:opacity-50"
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            |
            <button
              disabled={language === "tr"}
              className="disabled:opacity-50"
              onClick={() => setLanguage("tr")}
            >
              TR
            </button>
          </div>
        </div>
      </header>
      <div className="m-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
