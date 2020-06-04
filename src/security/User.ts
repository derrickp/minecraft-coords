export interface User {
  displayName: string;
  email: string;
}

export function fromFirebaseUser(firebaseUser: firebase.User): User {
  return {
    displayName: firebaseUser.displayName!,
    email: firebaseUser.email!
  };
}
