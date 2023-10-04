import { useQuery } from "@tanstack/react-query";
import { Feature } from "../model/spot.interface";
import { getSpots, spotQuery } from "../route-loaders/map-data-loader";

export const useSpotLoader: (filter: string) => Feature[] = (
  filter: string
) => {
  const { data: spots } = useQuery({
    ...spotQuery(filter),
    queryFn: () => getSpots(filter),
  });

  return spots || [];
};
