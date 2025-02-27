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
import App from "./App";

type Routes = RouteProps & {
  lazyElement?: React.LazyExoticComponent<() => JSX.Element>;
};

async function translationLoader(page: string) {
  const translation = await new Promise<string[]>((resolve) =>
    resolve([page, "Hello", "World"])
  );
  return { translation };
}

const queryClient = new QueryClient();
const routes: Routes[] = [];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} loader={() => translationLoader("home")} />
      {routes.map((route) => (
        <Route
          path={route.path}
          loader={() => translationLoader("home")}
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
