import { infoFromFirebaseUser } from "./firebaseTransforms";
import { Handle } from "~Handle";
import { getFirebaseApp } from "~bootstrap/firebase";
import { AuthInfo } from "./AuthInfo";

const subscriptions: Set<(user?: AuthInfo) => void> = new Set();

const firebaseApp = getFirebaseApp();

firebaseApp.auth().onAuthStateChanged((fbUser) => {
  console.log("auth changed");
  const user: AuthInfo | undefined = fbUser
    ? infoFromFirebaseUser(fbUser)
    : undefined;

  for (const callback of subscriptions) {
    callback(user);
  }
});

export function subscribeToUserChanges(
  callback: (user?: AuthInfo) => void
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
): Promise<AuthInfo | undefined> {
  const credential = await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return credential.user ? infoFromFirebaseUser(credential.user) : undefined;
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthInfo | undefined> {
  const credential = await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password);
  return credential.user ? infoFromFirebaseUser(credential.user) : undefined;
}

export async function signOut(): Promise<void> {
  return firebaseApp.auth().signOut();
}

export function getCurrentUserInfo(): AuthInfo | undefined {
  const app = getFirebaseApp();
  const currentUser = app.auth().currentUser;
  return currentUser ? infoFromFirebaseUser(currentUser) : undefined;
}
