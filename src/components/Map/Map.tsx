import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import "./Map.scss";

import { Feature } from "../../shared/model/spot.interface";
import { useMemo, useLayoutEffect, useState, useEffect, useRef } from "react";
import { LatLngTuple } from "leaflet";
import L from "leaflet";

interface MapProps {
  features: Feature[];
  selectedSpot: string;
}

interface IMapViewProps {
  /** the LatLong from the selected spot */
  selectedView: LatLngTuple | undefined;
}
interface IMarkerProps {
  feature: Feature;
  isSelected: boolean;
}

/**
 * component to set the view for selected spot
 * a component instead of a hook because useMap needs to be used inside the MapContainer
 * @param props IMapViewProps
 * @returns
 */
const MapView = (props: IMapViewProps) => {
  const map = useMap();

  useEffect(() => {
    const adjustedLatLongTuple: LatLngTuple | undefined =
      props.selectedView && [props.selectedView[1], props.selectedView[0]];
    if (!adjustedLatLongTuple) {
      map.setView([42.705, -7.5], 8);

      return;
    }
    map.setView(adjustedLatLongTuple, 10);
  }, [props.selectedView, map]);

  return null;
};

/**
 * CustomMarker which opens a popup automatically if selected
 * @param props IMarkerProps
 * @returns
 */
const CustomMarker = (props: IMarkerProps) => {
  const marker = useRef<L.CircleMarker<any> | null>(null);

  useEffect(() => {
    const currMarker = marker.current;

    if (props.isSelected) {
      currMarker?.openPopup();
    }

    return () => {
      currMarker?.closePopup();
    };
  }, [props.isSelected]);

  return (
    <CircleMarker
      ref={marker}
      center={[
        props.feature.geometry.coordinates[1],
        props.feature.geometry.coordinates[0],
      ]}
      radius={5}
      pathOptions={{
        color: props.isSelected ? "red" : "#777777",
        fill: true,
        fillOpacity: 1,
        fillColor: props.isSelected ? "red" : "#00000",
      }}
    >
      <Popup>
        <a href="/">{props.feature.properties.name}</a>
      </Popup>
    </CircleMarker>
  );
};

/**
 * the map component depicting the spots on a leaflet map
 * @param props IMapProps containing the selected spot and features
 * @returns
 */
function Map(props: MapProps) {
  const [unmountMap, setunmountMap] = useState(false);
  //to prevent map re-initialization
  useLayoutEffect(() => {
    setunmountMap(false);
    return () => {
      setunmountMap(true);
    };
  }, []);

  const selectedView = useMemo(
    () =>
      props.features.find((feat: Feature) => {
        return feat.properties.id === props.selectedSpot;
      })?.geometry.coordinates,
    [props]
  );

  if (unmountMap) {
    return null;
  }

  return (
    <MapContainer scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.features.map((feature: Feature) => (
        <CustomMarker
          key={feature?.properties.id}
          feature={feature}
          isSelected={props.selectedSpot === feature.properties.id}
        />
      ))}
      <MapView selectedView={selectedView} />
    </MapContainer>
  );
}

export default Map;
