import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Atlas from "./Pages/Atlas/Atlas";
import SpotDetailView from "./Pages/SpotDetailView/SpotDetailView";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";

import { loadAllSpots } from "./shared/route-loaders/map-data-loader";

import Root from "./App";
import Welcome from "./Pages/Welcome/Welcome";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoaderError from "./shared/components/LoaderError/LoaderError";
import "./index.css";

const queryClient = new QueryClient();
/**
 * the router config
 * using defer for the allspots-loader to not block the page from loading if data fetch is slow
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Welcome />}></Route>
        <Route
          path="atlas"
          loader={() => defer({ data: loadAllSpots(queryClient) })}
          errorElement={<LoaderError />}
          element={<Atlas />}
        ></Route>
        <Route path="spot">
          <Route path=":id" element={<SpotDetailView />}></Route>
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
