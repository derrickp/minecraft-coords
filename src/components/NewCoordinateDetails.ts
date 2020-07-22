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
  id: number,
  details: NewCoordinateDetails
): Coordinate {
  return {
    id,
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
