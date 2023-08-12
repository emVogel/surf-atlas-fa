import { LatLngTuple } from "leaflet";

export interface IDataResponse {
  data: Geo;
  response_status: HttpResponseStatus;
}

export interface HttpResponseStatus {
  status: number;
  message: string;
}

export interface Geometry {
  type: "Point";
  coordinates: LatLngTuple;
}

export interface Geo {
  type: "FeatureCollection";
  features: Feature[];
}

export interface Feature {
  type: "Feature";
  geometry: Geometry;
  properties: Spot;
}

export interface Spot {
  id: string;
  province: string;
  alternative_name: string;
  type: string;
  tide: string;
  wind: string;
  swell: string;
  bottom: string;
  direction: string;
  access: string;
  crowd: string;
  location: string;
  best_Season: string;
}
