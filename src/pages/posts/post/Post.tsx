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
import { FormEvent, useState } from "react";
import { useSendComment } from "../../../hooks/custom/useSendComment";

const Post = () => {
  const { t } = useTranslation("posts");
  const { postId } = useParams();
  if (postId === undefined)
    throw new Error("Post ID is required to load this page!");

  const [commentError, setCommentError] = useState(false);

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

  const { mutate } = useSendComment();

  function onSubmitCommit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const comment = formData.get("comment") as string | null;
    const input = e.currentTarget.getElementsByTagName("input")[0];
    if (comment === null || comment === "" || !postData) {
      setCommentError(true);
      input.focus();
      return;
    }
    input.value = "";
    mutate({
      postId: postData.id,
      body: comment,
      email: "dummy@gmail.com",
      name: "dummy",
    });
  }

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
              <form
                onSubmit={onSubmitCommit}
                className={`w-full ring rounded flex justify-baseline items-center py-2 px-4 ${
                  commentError && "ring-red-500"
                }`}
              >
                <input
                  type="text"
                  name="comment"
                  placeholder={t("writeComment")}
                  className="border-none focus:border-none focus:outline-none w-full"
                  onChange={() => setCommentError(false)}
                />
                <button type="submit">Send</button>
              </form>
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
