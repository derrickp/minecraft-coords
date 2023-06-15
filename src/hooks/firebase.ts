import { FirebaseApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { createContext, useContext } from "react";

const FirebaseContext = createContext<FirebaseApp | null>(null);
export const FirebaseProvider = FirebaseContext.Provider;

export const useFirebase = () => {
  const app = useContext(FirebaseContext);

  if (!app) {
    throw new Error("Must be used within a firebase context");
  }

  return app;
};

const useFirestore = () => {
  const app = useFirebase();
  return getFirestore(app);
};

export const useWorldCollection = () => {
  const firestore = useFirestore();

  return collection(firestore, "worlds");
};

export const useUserCollection = () => {
  const firestore = useFirestore();

  return collection(firestore, "users");
};
