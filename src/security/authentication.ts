import { infoFromFirebaseUser } from "./firebaseTransforms";
import { Handle } from "../Handle";
import { getFirebaseApp } from "../bootstrap/firebase";
import { AuthInfo } from "./AuthInfo";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";

const subscriptions: Set<(user?: AuthInfo) => void> = new Set();

const firebaseApp = getFirebaseApp();
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (fbUser) => {
  console.log("auth changed");
  const user: AuthInfo | undefined = fbUser
    ? infoFromFirebaseUser(fbUser)
    : undefined;

  for (const callback of subscriptions) {
    callback(user);
  }
});

export const subscribeToUserChanges = (
  callback: (user?: AuthInfo) => void
): Handle => {
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
};

export const signUp = async (
  email: string,
  password: string
): Promise<AuthInfo | undefined> => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return credential.user ? infoFromFirebaseUser(credential.user) : undefined;
};

export const signIn = async (
  email: string,
  password: string
): Promise<AuthInfo | undefined> => {
  const credential = await signInWithEmailAndPassword(auth, email, password);

  if (credential.user) {
    return infoFromFirebaseUser(credential.user);
  }
};

export const signOut = async (): Promise<void> => firebaseSignOut(auth);

export const getCurrentUserInfo = (): AuthInfo | undefined => {
  if (auth.currentUser) {
    return infoFromFirebaseUser(auth.currentUser);
  }
};
