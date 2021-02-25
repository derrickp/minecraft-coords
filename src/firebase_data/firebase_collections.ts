import { getFirebaseApp } from "../bootstrap/firebase";
import firebase from "firebase";

export function getUserCollection(): firebase.firestore.CollectionReference {
  const app = getFirebaseApp();
  return app.firestore().collection("users");
}

export function getWorldCollection(): firebase.firestore.CollectionReference {
  const app = getFirebaseApp();
  return app.firestore().collection("worlds");
}
