import { Trade } from "./Trade";

export interface VillagerTrade {
  name: string;
  villagerType: string;
  availableTrades: Trade[];
}
