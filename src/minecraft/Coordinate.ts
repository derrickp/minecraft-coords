import { VillagerTrade } from "./VillagerTrade";

export interface Coordinate {
  id: number;
  x: string;
  y: string;
  z: string;
  name: string;
  biome: string;
  tags: string[];
  hasVillageNearby: boolean;
  villagerTrades: VillagerTrade[];
}

type MaybeCoordinateId = number | undefined;

export function parseCoordinateId(possibleId: string): MaybeCoordinateId {
  const id = Number.parseInt(possibleId);
  if (Number.isNaN(id)) {
    return undefined;
  }
  return id;
}
