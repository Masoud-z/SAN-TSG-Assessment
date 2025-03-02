import { useQueryClient, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../core/constants/queryKeys";
import { PostDto } from "../../core/dto/post.dto";
import { getPostServiceApi } from "../../core/services/posts/methods";
import { getPostCommentsServiceApi } from "../../core/services/comments/methods";
import { CommentDto } from "../../core/dto/comment.dto";

export const usePost = (postId: string) => {
  const queryClient = useQueryClient();
  return useQuery<PostDto>({
    queryKey: [queryKeys.post, postId],
    queryFn: async () => {
      const response = await getPostServiceApi({ id: postId });
      return response.data[0];
    },
    placeholderData: () => {
      return queryClient
        .getQueryData<PostDto[]>([queryKeys.posts])
        ?.find((post: PostDto) => post.id.toString() === postId);
    },
    staleTime: 10000,
  });
};

export const useComment = (
  postId: number | undefined,
  viewComments: boolean
) => {
  return useQuery<CommentDto[]>({
    queryKey: [queryKeys.postComments, postId],
    queryFn: async () => {
      if (postId === undefined) throw new Error("postId is required");
      const response = await getPostCommentsServiceApi({
        postId: postId.toString(),
      });
      return response.data;
    },
    enabled: !!postId && viewComments,
    staleTime: 5000,
    refetchInterval: 5000,
  });
};

export const usePostWithComment = (postId: string, viewComments: boolean) => {
  const post = usePost(postId);
  const comments = useComment(post.data?.id, viewComments);
  return { post, comments };
};
