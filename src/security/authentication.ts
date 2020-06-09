import { User, fromFirebaseUser } from "./User";
import { Handle } from "~Handle";
import { getFirebaseApp } from "~bootstrap/firebase";

const subscriptions: Set<(user?: User) => void> = new Set();

const firebaseApp = getFirebaseApp();

firebaseApp.auth().onAuthStateChanged((fbUser) => {
  console.log("auth changed");
  const user: User | undefined = fbUser ? fromFirebaseUser(fbUser) : undefined;

  for (const callback of subscriptions) {
    callback(user);
  }
});

export function subscribeToUserChanges(
  callback: (user?: User) => void
): Handle {
  if (!subscriptions.has(callback)) {
    subscriptions.add(callback);
  }

  return {
    remove: () => {
      if (subscriptions.has(callback)) {
        subscriptions.delete(callback);
      }
    },
  };
}

export async function signUp(
  email: string,
  password: string
): Promise<User | undefined> {
  const credential = await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return credential.user ? fromFirebaseUser(credential.user) : undefined;
}

export async function signIn(
  email: string,
  password: string
): Promise<User | undefined> {
  const credential = await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password);
  return credential.user ? fromFirebaseUser(credential.user) : undefined;
}

export async function signOut(): Promise<void> {
  return firebaseApp.auth().signOut();
}
