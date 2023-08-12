import { Outlet, useLoaderData, Await } from "react-router-dom";
import Map from "../../components/Map";
import { Feature } from "../../model/spot.interface";
import { useState } from "react";
import Spinner from "../../shared/components/spinner/Spinner";
import { Suspense } from "react";
import LoaderError from "../../shared/components/LoaderError/LoaderError";
function Atlas() {
  const spots = useLoaderData() as { spots: Feature[] };

  return (
    <>
      <div>Atlas</div>
      <Suspense fallback={<Spinner size={10} />}>
        <Await resolve={spots.spots} errorElement={<LoaderError />}>
          {(spots) => <Map features={spots}></Map>}
        </Await>

        <Outlet />
      </Suspense>
    </>
  );
}

export default Atlas;
