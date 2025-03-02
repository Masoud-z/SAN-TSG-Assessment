import { NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction;

export const setNavigator = (navigator: NavigateFunction) => {
  navigate = navigator;
};

const redirect = (path: string) => {
  if (navigate) {
    navigate(path);
  } else {
    setTimeout(() => redirect(path), 100);
    console.warn("Navigator not yet initialized");
  }
};
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

  notAuthorized: { get: () => "/403", go: () => redirect("/403") },
};
