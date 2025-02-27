import { redirect } from "react-router-dom";
export const AppRouteKey = {
  home: { get: () => "/", go: () => redirect("/") },
  login: { get: () => "/login", go: () => redirect("/login") },
  posts: { get: () => "/posts", go: () => redirect("/posts") },
  post: {
    get: (id: number) => `/posts/${id}`,
    go: (id: number) => redirect(`/posts/${id}`),
  },
  editPost: {
    get: (id: number) => `/posts/${id}/edit`,
    go: (id: number) => redirect(`/posts/${id}/edit`),
  },
  createPost: {
    get: () => "/posts/create",
    go: () => redirect("/posts/create"),
  },
};
