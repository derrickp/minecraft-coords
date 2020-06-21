import { getFirebaseApp } from "~bootstrap/firebase";
import { firestore } from "firebase";

export function getUserCollection(): firestore.CollectionReference {
  const app = getFirebaseApp();
  return app.firestore().collection("users");
}

export function getWorldCollection(): firestore.CollectionReference {
  const app = getFirebaseApp();
  return app.firestore().collection("worlds");
}
