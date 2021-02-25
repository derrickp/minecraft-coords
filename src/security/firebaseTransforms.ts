import { AuthInfo } from "./AuthInfo";
import firebase from "firebase";

export function infoFromFirebaseUser(firebaseUser: firebase.User): AuthInfo {
  const email = !firebaseUser.email ? "" : firebaseUser.email;

  return {
    email,
    id: firebaseUser.uid,
  };
}
