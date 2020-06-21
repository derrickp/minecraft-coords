import { World } from "~minecraft/World";
import { getCurrentPersistedInfo } from "~firebase_data/users";
import { getWorlds } from "~firebase_data/worlds";

export interface User {
  id: string;
  email: string;
  worlds: World[];
}

export async function buildCurrentUser(): Promise<User> {
  const info = await getCurrentPersistedInfo();
  const persistedWorlds = await getWorlds();
  const worlds = persistedWorlds.map((p) => p as World);
  return {
    worlds,
    id: info.id,
    email: info.email,
  };
}
