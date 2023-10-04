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
import { Skeleton } from "../../components/skeleton/Skeleton";
import SpotsView from "../../components/Spots/Spots";

function Atlas() {
  return (
    <Suspense fallback={<Skeleton />}>
      <section className="atlas">
        <SpotsView></SpotsView>

        <Outlet />
      </section>
    </Suspense>
  );
}

export default Atlas;
