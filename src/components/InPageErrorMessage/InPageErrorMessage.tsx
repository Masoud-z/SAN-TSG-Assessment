import { useTranslation } from "react-i18next";

interface InPageErrorMessageProps {
  error: Error;
  refetch?: () => void;
}

const InPageErrorMessage = ({ error, refetch }: InPageErrorMessageProps) => {
  const { t } = useTranslation("main");
  return (
    <>
      <h5>{t("somethingWentWrong")}</h5>
      <div>{error.message}</div>
      {refetch && (
        <button onClick={() => refetch()}>
          {t("tryAgain", { ns: "main" })}
        </button>
      )}
    </>
  );
};

export default InPageErrorMessage;
