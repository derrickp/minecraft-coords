import { getFirebaseApp } from "../bootstrap/firebase";
import {
  collection,
  getFirestore,
  CollectionReference,
} from "firebase/firestore";

export const getUserCollection = (): CollectionReference => {
  const app = getFirebaseApp();
  const firestore = getFirestore(app);
  return collection(firestore, "users");
};

export const getWorldCollection = (): CollectionReference => {
  const app = getFirebaseApp();
  const firestore = getFirestore(app);
  return collection(firestore, "worlds");
};
