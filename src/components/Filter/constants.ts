import { FilterType, FilterValueDefinition } from "./types";

/**
 * maps the filterName to its corresponding values
 */
export const filterTypeMap: Record<FilterType, FilterValueDefinition> = {
  direction: { values: ["right", "left"], label: "Select a wave direction" },
  swell: {
    values: ["S", "SW", "W", "NW", "N"],
    label: "Select a swell swell direction",
  },
  wind: {
    values: ["SE", "S", "SW", "W", "NW", "N", "NE", "E"],
    label: "Select a wind direction",
  },
  province: {
    values: ["Vigo", "Rias Baixas", "Barbanza", "Costa do Morte"],
    label: "Select a province",
  },
  type: {
    values: ["Beach Break", "Reef", "Point Break"],
    label: "Select a wave type",
  },
  tide: {
    values: ["low", "mid", "high"],
    label: "Select a tide",
  },
};
