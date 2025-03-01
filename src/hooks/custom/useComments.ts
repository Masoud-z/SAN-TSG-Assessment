import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../../core/constants/queryKeys";
import { CommentDto } from "../../core/dto/comment.dto";
import { getCommentsServiceApi } from "../../core/services/comments/methods";

export const useComments = () => {
  return useSuspenseQuery<CommentDto[]>({
    queryKey: [queryKeys.posts],
    queryFn: async () => {
      const response = await getCommentsServiceApi();
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return response.data;
    },
    staleTime: 15000,
    refetchInterval: 15000,
  });
};
