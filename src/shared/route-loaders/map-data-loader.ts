import { QueryClient } from "@tanstack/react-query";
import { Feature } from "../model/spot.interface";

import { getRequestByUrl } from "./http-fetch";

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
  return getRequestByUrl(url);
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
