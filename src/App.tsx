import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation("main");
  return <div>{t("hello")}</div>;
}

export default App;
