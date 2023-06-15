import { getCurrentUserInfo } from "../security/authentication";
import { getUserCollection } from "./firebase_collections";
import { NoCurrentUserError } from "./NoCurrentUserError";
import { PersistedInfo } from "./PersistedInfo";
import { NoUserFoundError } from "./NoUserFoundError";
import { addDoc, getDocs, query, where } from "firebase/firestore";

export const isCurrentUserPersisted = async (): Promise<boolean> => {
  const currentInfo = getCurrentUserInfo();
  if (!currentInfo) {
    throw new NoCurrentUserError();
  }

  const collection = getUserCollection();
  const currentWhere = where("id", "==", currentInfo.id);
  const currentQuery = query(collection, currentWhere);
  const result = await getDocs(currentQuery);

  return result.size >= 1;
};

export const persistCurrentUserIfNotPersisted = async (): Promise<void> => {
  const alreadyPersisted = await isCurrentUserPersisted();
  if (alreadyPersisted) {
    return;
  }

  return persistCurrentUserInfo();
};

export const getCurrentPersistedInfo = async (): Promise<PersistedInfo> => {
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
};

const persistCurrentUserInfo = async (): Promise<void> => {
  const currentInfo = getCurrentUserInfo();
  if (!currentInfo) {
    throw new NoCurrentUserError();
  }

  const collection = getUserCollection();
  await addDoc(collection, {
    id: currentInfo.id,
    email: currentInfo.email,
  });
};
