import { Coordinate } from "~minecraft/Coordinate";

export interface NewCoordinateDetails {
  x: string;
  y: string;
  z: string;
  name: string;
  tags: string[];
  hasVillageNearby: boolean;
  biome: string;
}

export function coordinateFromDetails(
  details: NewCoordinateDetails
): Coordinate {
  return {
    x: details.x,
    y: details.y,
    z: details.z,
    tags: details.tags,
    biome: details.biome,
    hasVillageNearby: details.hasVillageNearby,
    name: details.name,
    villagerTrades: [],
  };
}
