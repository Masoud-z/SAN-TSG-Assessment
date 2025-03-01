import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../core/constants/queryKeys";
import { CommentDto } from "../../core/dto/comment.dto";
import { getCommentsServiceApi } from "../../core/services/comments/methods";

export const useComments = () => {
  return useQuery<CommentDto[]>({
    queryKey: [queryKeys.comments],
    queryFn: async () => {
      const response = await getCommentsServiceApi();
      return response.data;
    },
    staleTime: 15000,
    refetchInterval: 15000,
  });
};
