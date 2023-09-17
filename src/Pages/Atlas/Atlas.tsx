import { Outlet, useLoaderData, Await, defer } from "react-router-dom";
import Map from "../../components/Map/Map";
import { Feature, HttpResponseStatus } from "../../shared/model/spot.interface";
import { useState } from "react";
import Spinner from "../../shared/components/spinner/Spinner";
import { Suspense } from "react";
import LoaderError from "../../shared/components/LoaderError/LoaderError";
import { useQuery } from "@tanstack/react-query";
import { spotQuery } from "../../shared/route-loaders/map-data-loader";
import Spots from "../../components/Spots/Spots";
//const Map = lazy(() => import("../../components/Map/Map"));

function Atlas() {
  // const initialData = useLoaderData() as Feature[];
  // console.log(spots);
  /* const {
    data: spots,
    error,
    isLoading,
  } = useQuery({
    ...spotQuery(),
  });*/
  // console.log("init", spots, error);

  return (
    <section className="atlas-container">
      <div>Atlas</div>
      <div className="map-container">
        <Suspense fallback={<p>load babay </p>}>
          <Spots></Spots>
        </Suspense>
      </div>

      <Outlet />
    </section>
  );
}

export default Atlas;
