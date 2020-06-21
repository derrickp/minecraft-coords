import { Coordinate } from "./Coordinate";

export interface World {
  id: string;
  seed: string;
  name: string;
  coordinates: Coordinate[];
}

export function buildWorld(
  idUniqueifier: string,
  id: string,
  seed: string,
  name: string,
  coordinates: Coordinate[]
): World {
  return {
    seed,
    name,
    id: `${idUniqueifier}-${id}`,
    coordinates: coordinates ? coordinates : [],
  };
}
