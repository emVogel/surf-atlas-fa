import Map from "../../components/Map/Map";
import { useQuery } from "@tanstack/react-query";
import { spotQuery } from "../../shared/route-loaders/map-data-loader";
import { Suspense } from "react";
import Spinner from "../../shared/components/spinner/Spinner";
import { useSpotLoader } from "../../shared/hooks.ts/useSpotLoader";

function Spots() {
  const spots = useSpotLoader();

  return (
    <div className="spots">
      <div className="map-container">
        <Map features={spots}></Map>
      </div>
    </div>
  );
}

export default Spots;
