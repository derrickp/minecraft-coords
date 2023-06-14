import { getCurrentUserInfo } from "../security/authentication";
import { getUserCollection } from "./firebase_collections";
import { NoCurrentUserError } from "./NoCurrentUserError";
import { PersistedInfo } from "./PersistedInfo";
import { NoUserFoundError } from "./NoUserFoundError";
import { addDoc, getDocs, query, where } from "firebase/firestore";

export async function isCurrentUserPersisted(): Promise<boolean> {
  const currentInfo = getCurrentUserInfo();
  if (!currentInfo) {
    throw new NoCurrentUserError();
  }

  const collection = getUserCollection();
  const currentWhere = where("id", "==", currentInfo.id);
  const currentQuery = query(collection, currentWhere);
  const result = await getDocs(currentQuery);

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
  const userWhere = where("id", "==", currentInfo.id);
  const userQuery = query(collection, userWhere);
  const results = await getDocs(userQuery);
  const doc = results?.docs.at(0);

  if (!doc) {
    throw new NoUserFoundError();
  }
  return doc.data() as PersistedInfo;
}

async function persistCurrentUserInfo(): Promise<void> {
  const currentInfo = getCurrentUserInfo();
  if (!currentInfo) {
    throw new NoCurrentUserError();
  }

  const collection = getUserCollection();
  await addDoc(collection, {
    id: currentInfo.id,
    email: currentInfo.email,
  });
}
