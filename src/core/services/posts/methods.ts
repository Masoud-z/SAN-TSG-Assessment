import { PostDto } from "../../dto/post.dto";
import { httpGetService } from "../httpService";
import { urls } from "../urls";

export const getPostsServiceApi = () => {
  return httpGetService<PostDto[]>(urls.posts, {}, true);
};
