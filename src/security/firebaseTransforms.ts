import { AuthInfo } from "./AuthInfo";
import { User } from "firebase/auth";

export const infoFromFirebaseUser = (firebaseUser: User): AuthInfo => {
  const email = !firebaseUser.email ? "" : firebaseUser.email;

  return {
    email,
    id: firebaseUser.uid,
  };
};
