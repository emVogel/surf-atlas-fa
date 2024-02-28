import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import "./Map.scss";

import { Feature } from "../../shared/model/spot.interface";
import { useRef, useLayoutEffect, useState } from "react";

interface MapProps {
  features: Feature[];
  selectedSpot: string;
}

function Map(props: MapProps) {
  const map = useRef(null);

  const [unmountMap, setunmountMap] = useState(false);
  //to prevent map re-initialization
  useLayoutEffect(() => {
    setunmountMap(false);
    return () => {
      setunmountMap(true);
    };
  }, []);

  if (unmountMap) {
    return null;
  }

  return (
    <MapContainer
      center={[42.705, -7.5]}
      zoom={8}
      scrollWheelZoom={true}
      ref={map}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.features.map((feature: Feature) => (
        <CircleMarker
          key={feature?.properties.id}
          center={[
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]}
          radius={5}
          pathOptions={{
            color:
              props.selectedSpot === feature.properties.id ? "red" : "#777777",
            fill: true,
            fillOpacity: 1,
            fillColor:
              props.selectedSpot === feature.properties.id ? "red" : "#00000",
          }}
        >
          <Popup>
            <ul>
              <li>1</li>
              <li>2</li>
            </ul>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

export default Map;
