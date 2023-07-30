import { Outlet, useLoaderData } from "react-router-dom";
import Map from "../../components/Map";
import { Feature } from "../../model/spot.interface";
import { useState } from "react";

function Atlas() {
  const spots = useLoaderData() as Feature[];

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div>Atlas</div>
      <Map features={spots}></Map>

      <Outlet />
    </>
  );
}

export default Atlas;
