import { infoFromFirebaseUser } from "./firebaseTransforms";
import { Handle } from "~Handle";
import { getFirebaseApp } from "~bootstrap/firebase";
import { BasicInfo } from "./BasicInfo";

const subscriptions: Set<(user?: BasicInfo) => void> = new Set();

const firebaseApp = getFirebaseApp();

firebaseApp.auth().onAuthStateChanged((fbUser) => {
  console.log("auth changed");
  const user: BasicInfo | undefined = fbUser
    ? infoFromFirebaseUser(fbUser)
    : undefined;

  for (const callback of subscriptions) {
    callback(user);
  }
});

export function subscribeToUserChanges(
  callback: (user?: BasicInfo) => void
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
): Promise<BasicInfo | undefined> {
  const credential = await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return credential.user ? infoFromFirebaseUser(credential.user) : undefined;
}

export async function signIn(
  email: string,
  password: string
): Promise<BasicInfo | undefined> {
  const credential = await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password);
  return credential.user ? infoFromFirebaseUser(credential.user) : undefined;
}

export async function signOut(): Promise<void> {
  return firebaseApp.auth().signOut();
}
