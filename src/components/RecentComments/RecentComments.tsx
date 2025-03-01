import { useTranslation } from "react-i18next";
import Card from "../Card/Card";
import { useComments } from "../../hooks/custom/useComments";
import RecentSkeleton from "../RecentSkeleton/RecentSkeleton";

interface RecentCommentsProps {
  count: number;
}

const RecentComments = ({ count }: RecentCommentsProps) => {
  const { t } = useTranslation(["comments", "main"]);
  const { data, error, refetch, isLoading } = useComments();

  return (
    <>
      {isLoading ? (
        <RecentSkeleton count={5} title={t("recentComments")} />
      ) : (
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
              <ul className="space-y-4">
                {data?.slice(0, count).map((comment) => (
                  <li key={comment.id} className="line-clamp-2">
                    <span className="font-bold text-xl">
                      Post {comment.postId}:{" "}
                    </span>
                    {comment.body}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default RecentComments;
