import { VillagerTrade } from "./VillagerTrade";

export interface Coordinate {
  x: number;
  y: number;
  z: number;
  name: string;
  biome: string;
  tags: string[];
  villagerTrades: VillagerTrade[];
}
