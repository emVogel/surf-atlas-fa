import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Atlas from "./Pages/Atlas/Atlas";
import SpotList from "./Pages/SpotList/SpotList";
import SpotDetailView from "./Pages/SpotDetailView/SpotDetailView";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";

import { loadAllSpots } from "./shared/map-data-loader";
import LoaderError from "./shared/components/LoaderError/LoaderError";
import Root from "./App";
import Welcome from "./Pages/Welcome/Welcome";
import Spinner from "./shared/components/spinner/Spinner";
import { HttpResponseStatus, IDataResponse } from "./model/spot.interface";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Welcome />}></Route>
        <Route
          path="atlas"
          loader={async () => {
            const data = loadAllSpots();
            return defer({ spots: data });
          }}
          element={<Atlas />}
        >
          <Route path="/atlas" element={<SpotList />}></Route>
          <Route path=":id" element={<SpotDetailView />}></Route>
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
