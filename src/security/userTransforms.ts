import { User } from "~User";

export function fromFirebaseUser(firebaseUser: firebase.User): User {
  return {
    displayName: firebaseUser.displayName!,
    email: firebaseUser.email!,
  };
}
