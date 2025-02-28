import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation("main");
  return <h1>{t("hello")}</h1>;
}

export default App;
