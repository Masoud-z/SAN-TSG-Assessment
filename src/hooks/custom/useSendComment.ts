import {
  DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CommentDto } from "../../core/dto/comment.dto";
import { postCommentServiceApi } from "../../core/services/comments/methods";
import { queryKeys } from "../../core/constants/queryKeys";
import { toast } from "react-toastify";

export const useSendComment = () => {
  const queryClient = useQueryClient();
  return useMutation<
    CommentDto,
    DefaultError,
    Omit<CommentDto, "id">,
    (() => void) | undefined
  >({
    mutationFn: async ({ postId, name, email, body }) => {
      const response = await postCommentServiceApi({
        postId,
        name,
        email,
        body,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return response.data;
    },
    onMutate: async (newComment) => {
      const snapShot = queryClient.getQueryData<CommentDto[]>([
        queryKeys.postComments,
        newComment.postId,
      ]);
      queryClient.setQueryData<CommentDto[]>(
        [queryKeys.postComments, newComment.postId],
        (oldComments) => {
          const ids = oldComments?.map((comment) => comment.id) || [0];
          const maxId = Math.max(...ids);
          return [...(oldComments || []), { ...newComment, id: maxId + 1 }];
        }
      );
      return () => {
        queryClient.setQueryData<CommentDto[]>(
          [queryKeys.postComments, newComment.postId],
          snapShot
        );
      };
    },
    onError: (error, variables, rollBack) => {
      toast.error(error.message);
      rollBack?.();
    },
    onSettled: (comment) => {
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.comments, queryKeys.postComments, comment?.postId],
      });
    },
  });
};
