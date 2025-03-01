import { useTranslation } from "react-i18next";
import { usePosts } from "../../hooks/custom/usePosts";
import { Link } from "react-router-dom";
import { AppRouteKey } from "../../core/constants/routes";
import PostsSkelton from "../../components/PostsSkelton/PostsSkelton";
import useCheckPermission from "../../core/utilities/permissionChecker";
import { Permissions } from "../../core/enums/permissions";

const Posts = () => {
  const { t } = useTranslation("main");
  const { data, isLoading } = usePosts();

  return (
    <div className="m-6">
      <div className="w-full flex justify-between items-center mb-10">
        <h1>{t("posts")}</h1>
        {useCheckPermission(Permissions.CreatePost) && (
          <Link to={AppRouteKey.createPost.get()} className=" btn-primary">
            {t("createPost")}
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-8 justify-baseline items-baseline">
        {isLoading && <PostsSkelton count={3} />}
        {data?.map((post) => (
          <Link
            to={AppRouteKey.post.get(post.id)}
            key={post.id}
            className="p-4 ring-2 ring-blue-500 w-full rounded-2xl hover:bg-blue-300/10 transition-all delay-300 ease-linear font-bold  "
          >
            {post.title}
            <div className="line-clamp-1 font-normal mt-1">{post.body}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
