import { getCurrentUserInfo } from "../security/authentication";
import { getUserCollection } from "./firebase_collections";
import { NoCurrentUserError } from "./NoCurrentUserError";
import { PersistedInfo } from "./PersistedInfo";
import { NoUserFoundError } from "./NoUserFoundError";

export async function isCurrentUserPersisted(): Promise<boolean> {
  const currentInfo = getCurrentUserInfo();
  if (!currentInfo) {
    throw new NoCurrentUserError();
  }

  const collection = getUserCollection();
  const query = collection.where("id", "==", currentInfo.id);
  const result = await query.get();

  return result.size >= 1;
}

export async function persistCurrentUserIfNotPersisted(): Promise<void> {
  const alreadyPersisted = await isCurrentUserPersisted();
  if (alreadyPersisted) {
    return;
  }

  return persistCurrentUserInfo();
}

export async function getCurrentPersistedInfo(): Promise<PersistedInfo> {
  const currentInfo = getCurrentUserInfo();
  if (!currentInfo) {
    throw new NoCurrentUserError();
  }

  const collection = getUserCollection();
  const query = collection.where("id", "==", currentInfo.id);
  const result = await query.get();

  const doc = result.docs[0];
  if (!doc) {
    throw new NoUserFoundError();
  }
  return result.docs[0].data() as PersistedInfo;
}

async function persistCurrentUserInfo(): Promise<void> {
  const currentInfo = getCurrentUserInfo();
  if (!currentInfo) {
    throw new NoCurrentUserError();
  }

  const collection = getUserCollection();
  await collection.add({
    id: currentInfo.id,
    email: currentInfo.email,
  });
}
