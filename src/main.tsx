import { JSX, lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouteProps,
  RouterProvider,
} from "react-router-dom";
import "./i18n/i18n";
import Layout from "./components/Layout/Layout";
import { AppRouteKey } from "./core/constants/routes";
import { queryKeys } from "./core/constants/queryKeys";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import NotFound from "./pages/error/NotFound";
import ErrorPage from "./pages/error/ErrorPage";
import NotAuthorized from "./pages/error/NotAuthorized";
import ProtectedRoute from "./ProtectedRoute";
import Posts from "./pages/posts/Posts";
import { Permissions } from "./core/enums/permissions";

type Routes = RouteProps & {
  lazyElement?: React.LazyExoticComponent<() => JSX.Element>;
  permission?: string;
};

const queryClient = new QueryClient();
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
const routes: Routes[] = [
  {
    path: AppRouteKey.home.get(),
    lazyElement: lazy(() => import("./pages/home/Home")),
  },
  {
    path: AppRouteKey.login.get(),
    lazyElement: lazy(() => import("./pages/login/Login")),
  },
  {
    path: AppRouteKey.posts.get(),
    element: <Posts />,
    permission: Permissions.ViewPosts,
    children: [
      <Route path={`${AppRouteKey.posts.get()}/:postId`} element={<div>post</div>} />,
    ],
  },
  {
    path: AppRouteKey.notAuthorized.get(),
    element: <NotAuthorized />,
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={AppRouteKey.home.get()}
      element={<Layout />}
      errorElement={<ErrorPage />}
    >
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.permission ? (
              <ProtectedRoute permission={route.permission}>
                {route.lazyElement ? <route.lazyElement /> : route.element}
              </ProtectedRoute>
            ) : route.lazyElement ? (
              <route.lazyElement />
            ) : (
              route.element
            )
          }
          children={route.children}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => query.queryKey[0] === queryKeys.user,
        },
      }}
    >
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </PersistQueryClientProvider>
  </StrictMode>
);
