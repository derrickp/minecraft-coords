import { getFirebaseApp } from "../bootstrap/firebase";
import {
  collection,
  getFirestore,
  CollectionReference,
} from "firebase/firestore";

export function getUserCollection(): CollectionReference {
  const app = getFirebaseApp();
  const firestore = getFirestore(app);
  return collection(firestore, "users");
}

export function getWorldCollection(): CollectionReference {
  const app = getFirebaseApp();
  const firestore = getFirestore(app);
  return collection(firestore, "worlds");
}
