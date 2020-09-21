import { getWorldCollection } from "./firebase_collections";
import { World } from "../minecraft/World";
import { User } from "../User";
import { Handle } from "../Handle";

export async function saveNewWorld(world: World, user: User): Promise<World> {
  const collection = getWorldCollection();
  const persistedWorld: World = {
    ...world,
    owner: user.id,
    collaborators: [user.id],
  };
  const result = await collection.add(persistedWorld);
  persistedWorld.storageId = result.id;
  console.log(persistedWorld);
  return persistedWorld;
}

export async function updateWorld(world: World): Promise<void> {
  const collection = getWorldCollection();
  if (!world.storageId) {
    throw new Error("World needs to be saved first");
  }
  const doc = collection.doc(world.storageId);
  await doc.update(world);
}

interface WorldUpdateSubscription {
  userId: string;
  callbacks: ((worlds: World[]) => void)[];
}

const subscriptions: WorldUpdateSubscription[] = [];

export function subscribeToWorldChanges(
  userId: string,
  callback: (worlds: World[]) => void
): Handle {
  const haveExistingSubscription = subscriptions.some(
    (s) => s.userId === userId
  );

  if (!haveExistingSubscription) {
    const worldSubscription: WorldUpdateSubscription = {
      userId,
      callbacks: [callback],
    };
    subscriptions.push(worldSubscription);

    const collection = getWorldCollection();
    collection
      .where("collaborators", "array-contains", userId)
      .onSnapshot((snapshot) => {
        const worlds: World[] = [];
        snapshot.forEach((doc) => {
          const world = doc.data() as World;
          world.storageId = doc.id;
          worlds.push(world);
        });
        const index = subscriptions.findIndex((s) => s.userId === userId);
        if (index >= 0) {
          const worldSubscriptions = subscriptions[index];
          for (const callback of worldSubscriptions.callbacks) {
            callback(worlds);
          }
        }
      });
  }

  return {
    remove: () => {
      const index = subscriptions.findIndex((s) => s.userId === userId);
      if (index >= 0) {
        const callbackIndex = subscriptions[index].callbacks.findIndex(
          (c) => c == callback
        );
        if (callbackIndex >= 0) {
          subscriptions[index].callbacks.splice(callbackIndex, 1);
        }
        if (subscriptions[index].callbacks.length === 0) {
          subscriptions.splice(index, 1);
        }
      }
    },
  };
}
