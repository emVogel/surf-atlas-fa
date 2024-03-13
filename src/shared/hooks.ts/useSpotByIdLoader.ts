import { useQuery } from "@tanstack/react-query";
import { Feature } from "../model/spot.interface";
import { fetchSpotById, spotByIdQuery } from "../route-loaders/spot-id.loader";

export const useSpotByIdLoader: (id: string) => Feature[] = (id: string) => {
  const { data: spots } = useQuery({
    ...spotByIdQuery(id),
    queryFn: () => fetchSpotById(id),
  });

  return spots || [];
};
