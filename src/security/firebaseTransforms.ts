import { BasicInfo } from "./BasicInfo";

export function infoFromFirebaseUser(firebaseUser: firebase.User): BasicInfo {
  const displayName = !firebaseUser.displayName ? "" : firebaseUser.displayName;
  const email = !firebaseUser.email ? "" : firebaseUser.email;
  return {
    displayName,
    email,
  };
}
