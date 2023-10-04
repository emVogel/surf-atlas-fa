import Map from "../../components/Map/Map";
import { useQuery } from "@tanstack/react-query";
import { spotQuery } from "../../shared/route-loaders/map-data-loader";
import { Suspense, useState } from "react";

import { useSpotLoader } from "../../shared/hooks.ts/useSpotLoader";
import "./Spots.scss";
import { FilterPanel } from "../Filter/Filter";
import SpotTable from "../SpotTable/SpotTable";
import { Spot } from "../../shared/model/spot.interface";

function SpotsView() {
  const [filter, setFilter] = useState("");
  const spots = useSpotLoader(filter);

  const tableSpots: Spot[] = spots.map((spot) => spot.properties);

  return (
    <div className="spots">
      <div className="filter__panel">
        <FilterPanel />
      </div>
      <div className="table__container">
        <SpotTable spots={tableSpots} />
      </div>
      <div className="map__container">
        <Map features={spots}></Map>
      </div>
    </div>
  );
}

export default SpotsView;
