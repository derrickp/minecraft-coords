import { BasicInfo } from "./BasicInfo";

export function infoFromFirebaseUser(firebaseUser: firebase.User): BasicInfo {
  return {
    displayName: firebaseUser.displayName!,
    email: firebaseUser.email!,
  };
}
