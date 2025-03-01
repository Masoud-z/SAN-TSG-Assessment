import { useTranslation } from "react-i18next";
import { usePosts } from "../../hooks/custom/usePosts";
import Card from "../Card/Card";

interface RecentCommentsProps {
  count: number;
}

const RecentComments = ({ count }: RecentCommentsProps) => {
  const { t } = useTranslation(["comments", "main"]);
  const { data, error, refetch } = usePosts();

  return (
    <Card className="w-96 flex flex-col justify-baseline items-baseline gap-4 py-4 px-3 min-h-96">
      <h3>{t("recentComments")}</h3>
      {error ? (
        <>
          <h5>{t("somethingWentWrong", { ns: "main" })}</h5>
          <div>{error.message}</div>
          <button onClick={() => refetch()}>
            {t("tryAgain", { ns: "main" })}
          </button>
        </>
      ) : (
        <>
          <ol type="1" className="space-y-4">
            {data?.slice(0, count).map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ol>
        </>
      )}
    </Card>
  );
};

export default RecentComments;
