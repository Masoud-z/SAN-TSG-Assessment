import { useParams } from "react-router-dom";

import InPageErrorMessage from "../../../components/InPageErrorMessage/InPageErrorMessage";
import { useTranslation } from "react-i18next";
import { AppRouteKey } from "../../../core/constants/routes";
import { Permissions } from "../../../core/enums/permissions";
import LinkWithPermission from "../../../components/LinkWithPermission/LinkWithPermission";
import { usePostWithComment } from "../../../hooks/custom/usePostWithComment";
import useCheckPermission from "../../../core/utilities/permissionChecker";
import PostSkeleton from "./components/PostSkeleton";
import SpinningCircularLoader from "../../../components/SpinningCircularLoader/SpinningCircularLoader";
import Card from "../../../components/Card/Card";

const Post = () => {
  const { t } = useTranslation("posts");
  const { postId } = useParams();
  if (postId === undefined)
    throw new Error("Post ID is required to load this page!");

  const viewComments = useCheckPermission(Permissions.ViewComments);
  const { post, comments } = usePostWithComment(postId, viewComments);
  const {
    data: postData,
    error: postError,
    refetch: postRefetch,
    isLoading: postIsLoading,
  } = post;
  const {
    data: commentsData,
    error: commentsError,
    refetch: commentsRefetch,
    isLoading: commentsIsLoading,
  } = comments;

  return (
    <div className="flex flex-col justify-center items-center gap-3 px-5 py-7 ring rounded-2xl">
      {postIsLoading && <PostSkeleton />}
      {postError && (
        <InPageErrorMessage error={postError} refetch={postRefetch} />
      )}
      {postData && (
        <>
          <div className="w-full flex justify-between items-center">
            <h3>{t("postTopic")}</h3>
            <LinkWithPermission
              to={AppRouteKey.editPost.get(postData.id)}
              className="btn"
              title={t("editPost")}
              permission={Permissions.EditPost}
            />
          </div>
          <h1 className="text-center">{postData.title}</h1>
          <div>{postData.body}</div>
        </>
      )}

      {viewComments && postData && (
        <div className="w-full flex flex-col justify-baseline items-baseline gap-8">
          <h3>{t("postComment")}</h3>
          {commentsIsLoading && (
            <SpinningCircularLoader className="w-12 h-12" />
          )}
          {commentsError && (
            <InPageErrorMessage
              error={commentsError}
              refetch={commentsRefetch}
            />
          )}
          {commentsData && (
            <div className="flex justify-baseline items-baseline flex-col gap-4">
              <Card className="w-full flex flex-col gap-2 p-3">
                {commentsData.map((comment) => (
                  <div key={comment.id}>
                    <h4>{comment.name}: </h4>
                    <p>{comment.body}</p>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
