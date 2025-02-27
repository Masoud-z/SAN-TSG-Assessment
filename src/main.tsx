import { JSX, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouteProps,
  RouterProvider,
} from "react-router-dom";
import "./i18n/i18n";
import App from "./App";

type Routes = RouteProps & {
  lazyElement?: React.LazyExoticComponent<() => JSX.Element>;
};

const queryClient = new QueryClient();
const routes: Routes[] = [];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      {routes.map((route) => (
        <Route
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
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
