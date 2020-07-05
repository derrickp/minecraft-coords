import { VillagerTrade } from "./VillagerTrade";

export interface Coordinate {
  x: string;
  y: string;
  z: string;
  name: string;
  biome: string;
  tags: string[];
  hasVillageNearby: boolean;
  villagerTrades: VillagerTrade[];
}
