import { useTranslation } from "react-i18next";
import { PostDto } from "../../core/dto/post.dto";
import { useNewPost } from "../../hooks/custom/usePosts";
import { useState } from "react";
import SpinningCircularLoader from "../SpinningCircularLoader/SpinningCircularLoader";
import { useNavigate } from "react-router-dom";

interface CreateEditPostProps {
  post?: PostDto;
}

const CreateEditPost = ({ post }: CreateEditPostProps) => {
  const { t } = useTranslation("posts");
  const navigate = useNavigate();
  const [error, setError] = useState({ title: false, body: false });
  const { mutate: newPostMutate, isPending: newPostPending } = useNewPost();

  function submitPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string | null;
    const body = formData.get("body") as string | null;
    console.log(title, body);
    if (!title || !body || title.length < 3 || body?.length < 10) {
      setError({
        title: !title || title.length < 3,
        body: !body || body.length < 10,
      });
      return;
    }
    if (!post) {
      newPostMutate({ title, body, userId: 1 });
    }
  }
  return (
    <form
      onSubmit={submitPost}
      className="flex flex-col justify-baseline items-baseline gap-9"
    >
      <h1>{t(post ? "editPost" : "createPost")}</h1>
      {post && <h3>{post.title}</h3>}
      <div className="flex w-full flex-col justify-center items-baseline gap-3">
        <label
          htmlFor="title"
          className={`font-medium text-lg ${error.title && "text-red-500"}`}
        >
          {t("postTitle")}*
          <span className="font-normal text-sm ml-3">{t("least3char")}</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`ring rounded w-full p-2 ${error.title && "ring-red-500"}`}
          placeholder={t("postTitle")}
          defaultValue={post?.title}
          onChange={() => {
            if (error.title) setError((prev) => ({ ...prev, title: false }));
          }}
          disabled={newPostPending}
        />

        <label
          htmlFor="body"
          className={`font-medium mt-4 text-lg ${error.body && "text-red-500"}`}
        >
          {t("postContent")}*
          <span className="font-normal text-sm ml-3">{t("least10char")}</span>
        </label>
        <textarea
          rows={4}
          id="body"
          name="body"
          className={`ring rounded w-full p-2 ${error.body && "ring-red-500"}`}
          placeholder={t("postContent")}
          defaultValue={post?.body}
          onChange={() => {
            if (error.body) setError((prev) => ({ ...prev, body: false }));
          }}
          disabled={newPostPending}
        >
          {post?.body}
        </textarea>
      </div>
      <div className="flex justify-baseline items-center gap-4">
        <button type="submit" className="btn-primary" disabled={newPostPending}>
          {newPostPending ? (
            <SpinningCircularLoader className="w-6 h-6" />
          ) : (
            t("save")
          )}
        </button>
        <button
          className="btn"
          disabled={newPostPending}
          onClick={() => {
            navigate(-1);
          }}
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
};

export default CreateEditPost;
