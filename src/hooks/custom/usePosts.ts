import { useQuery } from "@tanstack/react-query";
import { PostDto } from "../../core/dto/post.dto";
import { getPostsServiceApi } from "../../core/services/posts/methods";
import { queryKeys } from "../../core/constants/queryKeys";

export const usePosts = () => {
  return useQuery<PostDto[]>({
    queryKey: [queryKeys.posts],
    queryFn: async () => {
      const response = await getPostsServiceApi();
      return response.data;
    },
    staleTime: 30000,
    refetchInterval: 30000,
  });
};
