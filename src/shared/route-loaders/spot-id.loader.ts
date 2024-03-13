import { getRequestByUrl } from "./http-fetch";
import { Feature } from "../model/spot.interface";
import { QueryClient } from "@tanstack/react-query";

/**
 *
 * @returns a query config with request fn and query key to uniquely identify the query
 */
export const spotByIdQuery = (id: string) => ({
  queryKey: ["spotId", id],
  queryFn: () => fetchSpotById(id),
  suspense: true,
});

/**
 * fetch for the spot by id used in the detailed view
 * @param id the id of the spot
 * @returns Promise<Feature[]>
 */
export function fetchSpotById(id: string): Promise<Feature[]> {
  const url = `/api/spotsById?id=${id}`;
  return getRequestByUrl(url);
}

/**
 * fetches the data from the server or from the chache of react-query if the query-key is known
 * @param queryClient the client for the query
 */
export const loadSpotById = (queryClient: QueryClient) => async () => {
  console.log("loading spots");
  return (
    queryClient.getQueryData(spotByIdQuery("").queryKey) ??
    (await queryClient.fetchQuery({ ...spotByIdQuery }))
  );
};
