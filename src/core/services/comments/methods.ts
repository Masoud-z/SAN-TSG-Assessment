import { CommentDto } from "../../dto/comment.dto";
import { httpGetService } from "../httpService";
import { urls } from "../urls";

export const getCommentsServiceApi = () => {
  return httpGetService<CommentDto[]>(urls.comments, {}, true);
};

export const getPostCommentsServiceApi = (params: { postId: string }) => {
  return httpGetService<CommentDto[]>(urls.comments, { params }, true);
};
