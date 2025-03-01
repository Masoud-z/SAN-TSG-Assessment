import { Link } from "react-router-dom";
import { AppRouteKey } from "../../core/constants/routes";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation("main");
  return (
    <div
      id="error-page"
      className="w-full h-screen justify-baseline mt-9 items-center flex flex-col gap-4 "
    >
      <img src="/404.jpg" width={300} height={300} />
      <h2>404 {t("notFound")}</h2>
      <h3 className="underline">
        <Link to={AppRouteKey.home.get()}>{t("homePage")}</Link>
      </h3>
    </div>
  );
};

export default NotFound;
