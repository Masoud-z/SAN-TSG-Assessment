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
import App from "./App";
import Layout from "./components/layout/Layout";
import { AppRouteKey } from "./core/constants/routes";
import { queryKeys } from "./core/constants/queryKeys";

type Routes = RouteProps & {
  lazyElement?: React.LazyExoticComponent<() => JSX.Element>;
};

const queryClient = new QueryClient();
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
const routes: Routes[] = [
  {
    path: AppRouteKey.login.get(),
    lazyElement: lazy(() => import("./pages/login/Login")),
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={AppRouteKey.home.get()} element={<Layout />}>
      <Route index element={<App />} />
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.lazyElement ? (
              <Suspense fallback={<div>Loading...</div>}>
                <route.lazyElement />
              </Suspense>
            ) : (
              route.element
            )
          }
        />
      ))}
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
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </PersistQueryClientProvider>
  </StrictMode>
);
