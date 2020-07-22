import { World, MaybeWorld } from "~minecraft/World";
import { PersistedInfo } from "~firebase_data/PersistedInfo";

export interface User {
  id: string;
  email: string;
  worlds: World[];
}

export type MaybeUser = User | undefined;

export function buildUser(info: PersistedInfo, worlds: World[] = []): User {
  return {
    id: info.id,
    email: info.email,
    worlds,
  };
}

export function worldById(user: User, worldId: string): MaybeWorld {
  return user.worlds.find((w) => w.id == worldId);
}
