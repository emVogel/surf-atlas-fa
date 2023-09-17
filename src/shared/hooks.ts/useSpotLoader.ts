import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Feature } from "../model/spot.interface";
import { spotQuery } from "../route-loaders/map-data-loader";

export const useSpotLoader: () => Feature[] = () => {
  const { data: spots } = useQuery({
    ...spotQuery(),
  });

  return spots || [];
};
