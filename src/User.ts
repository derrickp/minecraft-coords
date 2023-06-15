import { World } from "./minecraft/World";
import { PersistedInfo } from "./firebase_data/PersistedInfo";

export interface User {
  id: string;
  email: string;
  worlds: World[];
  worldById: (id: string) => World | undefined;
}

export function buildUser(info: PersistedInfo, worlds: World[] = []): User {
  return {
    id: info.id,
    email: info.email,
    worlds,
    worldById: (id) => worlds.find((w) => w.id == id),
  };
}
