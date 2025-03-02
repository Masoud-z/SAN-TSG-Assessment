import { Link } from "react-router-dom";
import { AppRouteKey } from "../../core/constants/routes";
import { usePosts } from "../../hooks/custom/usePosts";
import Card from "../Card/Card";
import { useTranslation } from "react-i18next";
import RecentSkeleton from "../RecentSkeleton/RecentSkeleton";
import InPageErrorMessage from "../InPageErrorMessage/InPageErrorMessage";

interface RecentPostsProps {
  count: number;
}

const RecentPosts = ({ count }: RecentPostsProps) => {
  const { t } = useTranslation(["posts", "main"]);
  const { data, error, refetch, isLoading } = usePosts();

  return (
    <>
      {isLoading ? (
        <RecentSkeleton count={5} title={t("recentPosts")} />
      ) : (
        <Card className="w-96 flex flex-col justify-baseline items-baseline gap-4 py-4 px-3 min-h-96">
          <h3>{t("recentPosts")}</h3>
          {error ? (
            <InPageErrorMessage error={error} refetch={refetch} />
          ) : (
            <>
              <ul className="space-y-4">
                {data?.slice(0, count).map((post) => (
                  <li key={post.id}>
                    <Link to={AppRouteKey.post.get(post.id)}>{post.title}</Link>
                  </li>
                ))}
              </ul>
              <h4>
                <Link to={AppRouteKey.posts.get()}>{t("viewAllPosts")}</Link>
              </h4>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default RecentPosts;
