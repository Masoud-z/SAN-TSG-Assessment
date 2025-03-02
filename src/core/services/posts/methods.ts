import { PostDto } from "../../dto/post.dto";
import { httpGetService, httpPostService } from "../httpService";
import { urls } from "../urls";

export const getPostsServiceApi = () => {
  return httpGetService<PostDto[]>(urls.posts, {}, true);
};

export const getPostServiceApi = (params: { id: string }) => {
  return httpGetService<PostDto[], { id: string }>(urls.posts, { params }, true);
};

export const postNewPostServiceApi = (body: Omit<PostDto, "id">) => {
  return httpPostService<PostDto, Omit<PostDto, "id">>(
    urls.comments,
    body,
    {},
    false
  );
};