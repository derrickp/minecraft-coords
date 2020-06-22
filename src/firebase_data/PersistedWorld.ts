import { World } from "~minecraft/World";

export interface PersistedWorld extends World {
  owner: string;
  collaborators: string[];
}
