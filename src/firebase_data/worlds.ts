import { PersistedWorld } from "./PersistedWorld";
import { getWorldCollection } from "./firebase_collections";

export async function getWorlds(): Promise<PersistedWorld[]> {
  const collection = getWorldCollection();
  const results = await collection.get();
  return results.docs.map((r) => r.data() as PersistedWorld);
}
