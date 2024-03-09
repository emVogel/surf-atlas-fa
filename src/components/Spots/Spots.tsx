import Map from "../../components/Map/Map";
import { useCallback, useEffect, useState } from "react";

import { useSpotLoader } from "../../shared/hooks.ts/useSpotLoader";
import "./Spots.scss";
import FilterPanel from "../Filter/Filter";
import SpotTable from "../SpotTable/SpotTable";
import { Spot } from "../../shared/model/spot.interface";

/**
 * the container for the map, filter and table
 */
function SpotsView() {
  const [urlFilter, setUrlFilter] = useState("");
  const [selectedSpot, setSelectedSpot] = useState("");
  const spots = useSpotLoader(urlFilter);

  const tableSpots: Spot[] = spots.map((spot) => spot.properties);

  const handleFilterUrlChange = useCallback((filter: string) => {
    setUrlFilter(filter);
  }, []);

  useEffect(() => {
    setSelectedSpot("");
  }, [urlFilter]);

  return (
    <div className="spots">
      <div className="filter__panel">
        <FilterPanel onFilterValueChange={handleFilterUrlChange} />
      </div>
      <div className="table__container">
        <SpotTable
          spots={tableSpots}
          onSelectedSpot={(spotId: string) => setSelectedSpot(spotId)}
          selectedRow={selectedSpot}
        />
      </div>
      <div className="map__container">
        <Map
          features={spots}
          selectedSpot={selectedSpot}
          selectSpotHandler={(id: string) => setSelectedSpot(id)}
        ></Map>
      </div>
    </div>
  );
}

export default SpotsView;
