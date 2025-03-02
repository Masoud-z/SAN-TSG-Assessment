import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostDto } from "../../core/dto/post.dto";
import {
  getPostsServiceApi,
  postNewPostServiceApi,
} from "../../core/services/posts/methods";
import { queryKeys } from "../../core/constants/queryKeys";
import { toast } from "react-toastify";
import { AppRouteKey } from "../../core/constants/routes";

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

export const useNewPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: Omit<PostDto, "id">) => {
      const response = await postNewPostServiceApi(body);
      return response.data;
    },

    onError: (error) => {
      toast.error(`Failed to create a post, ${error.message}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.posts] });
      toast.success("Post created successfully!");
      AppRouteKey.posts.go();
    },
  });
};
