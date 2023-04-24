import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.scss";

import { Feature, Geo } from "../model/spot.interface";

interface MapProps {
  features: Feature[];
}

function Map(props: MapProps) {
  return (
    <MapContainer center={[42.505, -10]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.features.map((feature: Feature) => (
        <Marker
          key={feature?.properties.id}
          position={[
            feature?.geometry.coordinates[1],
            feature?.geometry.coordinates[0],
          ]}
        >
          <Popup>
            <ul>
              <li>1</li>
              <li>2</li>
            </ul>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
