import { QueryClient } from "@tanstack/react-query";
import {
  Feature,
  HttpResponseStatus,
  IDataResponse,
} from "../model/spot.interface";

/**
 *
 * @returns a query config with request fn and query key to uniquely identify the query
 */
export const spotQuery = (filter: string) => ({
  queryKey: ["spots", filter],
  queryFn: () => getSpots(filter),
  suspense: true,
});

/**
 * the route- loader for the initial spots, used in the setup of the routes
 * @param request the request obj used internally from the react-router
 * @returns Features[]
 */

export function getSpots(filter: string): Promise<Feature[]> {
  const url = filter ? `/api/filterspots?${filter}` : "/api/spots";
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response: Response) => {
      return new Promise((resolve) => {
        return setTimeout(() => {
          return resolve(response);
        }, 4000);
      }) as Promise<Response>;
    })
    .then((response: Response) => {
      console.log("fetching init");
      if (!response.ok || typeof response === "undefined") {
        return Promise.reject<HttpResponseStatus>({
          status: response.status || 400,
          message: response.statusText || "Something went wrong",
        });
      }
      return response.json();
    })
    .then((data: IDataResponse) => {
      const response: IDataResponse = data as IDataResponse;
      if (response.response_status.status > 399) {
        return Promise.reject({
          status: response.response_status.status,
          message: response.response_status.message,
        });
      }
      return response.data.features;
    })
    .catch((error: HttpResponseStatus) => {
      console.error(error.status, error.message);
      throw new Response("loading error", {
        status: error.status === 200 ? 400 : error.status,
        statusText: error.message,
      });
    });
}

/**
 * fetches the data from the server or from the chache of react-query if the query-key is known
 * @param queryClient the client for the query
 */
export const loadAllSpots = (queryClient: QueryClient) => async () => {
  console.log("loading spots");
  return (
    queryClient.getQueryData(spotQuery("").queryKey) ??
    (await queryClient.fetchQuery({ ...spotQuery }))
  );
};
