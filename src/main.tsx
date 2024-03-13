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
import SpotsView from "./Pages/Atlas/components/Spots/Spots";
import { loadSpotById } from "./shared/route-loaders/spot-id.loader";

const queryClient = new QueryClient();
/**
 * the router config
 * using defer for the allspots-loader to not block the page from loading if data fetch is slow
 * defer takes a Promise and resolves it
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="atlas" element={<Atlas />}>
          <Route
            path="/atlas"
            element={<SpotsView />}
            loader={() => defer({ data: loadAllSpots(queryClient) })}
            errorElement={<LoaderError />}
          ></Route>

          <Route path="/atlas/spot">
            <Route
              path=":id"
              element={<SpotDetailView />}
              loader={() => defer({ data: loadSpotById(queryClient) })}
              errorElement={<LoaderError />}
            ></Route>
          </Route>
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
