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
import ErrorPage from "./pages/error/ErrorPage";
import NotFound from "./pages/error/NotFound";
// import Home from "./pages/home/Home";

type Routes = RouteProps & {
  lazyElement?: React.LazyExoticComponent<() => JSX.Element>;
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
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={AppRouteKey.home.get()}
      element={<Layout />}
      errorElement={<ErrorPage />}
    >
      {/* <Route index element={<Home />} /> */}
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.lazyElement ? <route.lazyElement /> : route.element}
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
