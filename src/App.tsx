import "./App.css";
import { useTranslation } from "react-i18next";
import { usePosts } from "./hooks/custom/usePosts";

function App() {
  const { t } = useTranslation("main");
  const { data } = usePosts();
  console.log(data);
  return <h1>{t("hello")}</h1>;
}

export default App;
