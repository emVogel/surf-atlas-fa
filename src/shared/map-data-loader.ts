import { Feature, HttpResponseStatus, Request } from "../model/spot.interface";
import { json } from "react-router-dom";

/**
 * the route- loader for the initial spots, used in the setup of the routes
 * @param request the request obj used internally from the react-router
 * @returns Features[]
 */
export function loadAllSpots(): Promise<Feature[]> {
  return fetch("/api/spots", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response: Response) => {
      if (response.status > 300) {
        throw json<HttpResponseStatus>({
          status: response.status,
          message: response.statusText,
        });
      }
      return response.json();
    })
    .then((data: Request) => {
      return data.data.features;
    });
}
