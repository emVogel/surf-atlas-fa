/**
 * the properties to filter the spots for
 */

export type FilterType =
  | "direction"
  | "wind"
  | "swell"
  | "province"
  | "type"
  | "tide";

/** a type for the filter definition for a fiven filter-key */
export type FilterValueDefinition = {
  values: string[];
  label: string;
};
