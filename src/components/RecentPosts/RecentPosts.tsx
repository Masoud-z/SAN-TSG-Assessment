import { Link } from "react-router-dom";
import { AppRouteKey } from "../../core/constants/routes";
import { usePosts } from "../../hooks/custom/usePosts";
import Card from "../Card/Card";
import { useTranslation } from "react-i18next";

interface RecentPostsProps {
  count: number;
}

const RecentPosts = ({ count }: RecentPostsProps) => {
  const { t } = useTranslation(["posts", "main"]);
  const { data, error, refetch } = usePosts();

  return (
    <Card className="w-96 flex flex-col justify-baseline items-baseline gap-4 py-4 px-3 min-h-96">
      <h3>{t("recentPosts")}</h3>
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
              <li key={post.id}>
                <Link to={AppRouteKey.post.get(post.id)}>{post.title}</Link>
              </li>
            ))}
          </ol>
          <h4>
            <Link to={AppRouteKey.posts.get()}>{t("viewAllPosts")}</Link>
          </h4>
        </>
      )}
    </Card>
  );
};

export default RecentPosts;
