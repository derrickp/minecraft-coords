import { Coordinate } from "../minecraft/Coordinate";

export interface NewCoordinateDetails {
  x: string;
  y: string;
  z: string;
  name: string;
  tags: string[];
  biome: string;
  hasVillageNearby: boolean;
  farms: string[];
}

export function coordinateFromDetails(
  id: number,
  details: NewCoordinateDetails
): Coordinate {
  return {
    id,
    ...details,
  };
}
