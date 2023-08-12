import {
  Feature,
  HttpResponseStatus,
  IDataResponse,
} from "../model/spot.interface";
import { defer, json } from "react-router-dom";

declare type DeferredData = ReturnType<typeof defer>;
/**
 * the route- loader for the initial spots, used in the setup of the routes
 * @param request the request obj used internally from the react-router
 * @returns Features[]
 */

export async function loadAllSpots(): Promise<Feature[] | HttpResponseStatus> {
  return fetch("/api/spots", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response: Response) => {
      if (!response.ok) {
        return Promise.reject<HttpResponseStatus>({
          status: response.status || 400,
          message: response.statusText || "Something went wrong",
        });
      }
      return response.json();
    })
    .then((data: IDataResponse) => {
      const response: IDataResponse = data as IDataResponse;
      if (response.response_status.status > 301) {
        return {
          status: response.response_status.status,
          message: response.response_status.message,
        };
      }
      return response.data.features;
    })
    .catch((error: HttpResponseStatus) => {
      console.log(error.status);
      throw new Response("not found ", {
        status: error.status,
        statusText: error.message,
      });
    });
}
