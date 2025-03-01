import { Link } from "react-router-dom";
import { AppRouteKey } from "../../core/constants/routes";
import { useTranslation } from "react-i18next";

const NotAuthorized = () => {
  const { t } = useTranslation("main");
  return (
    <div
      id="error-page"
      className="w-full h-screen justify-baseline mt-9 items-center flex flex-col gap-4 "
    >
      <img src="/403.png" width={300} height={300} />
      <h2>403 {t("notAuthorized")}</h2>
      <h3 className="underline">
        <Link to={AppRouteKey.home.get()}>{t("homePage")}</Link>
      </h3>
    </div>
  );
};

export default NotAuthorized;
