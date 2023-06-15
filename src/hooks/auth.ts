import { useEffect, useState } from "react";
import { useFirebase, useUserCollection } from "./firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthInfo } from "../security/AuthInfo";
import { infoFromFirebaseUser } from "../security/firebaseTransforms";
import { useNavigate } from "react-router-dom";
import {
  CollectionReference,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const useAuth = () => {
  const app = useFirebase();
  return getAuth(app);
};

export const useAuthInfo = () => {
  const auth = useAuth();
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (fbUser) => {
      const authInfo: AuthInfo | null = fbUser
        ? infoFromFirebaseUser(fbUser)
        : null;

      setAuthInfo((current) => {
        if (!authInfo) {
          return null;
        }

        if (!current) {
          return authInfo;
        }

        if (current.email === authInfo.email && current.id === authInfo.id) {
          return current;
        }
        return authInfo;
      });
    });
  }, [auth, setAuthInfo]);

  return { authInfo };
};

export const useSignOut = () => {
  const auth = useAuth();

  return () => signOut(auth);
};

export const useSignIn = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    if (credential) {
      navigate("/");
    }
  };
};

export const useSignUp = () => {
  const auth = useAuth();
  const collection = useUserCollection();
  const navigate = useNavigate();

  return async (email: string, password: string) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const authInfo: AuthInfo = {
      id: credential.user.uid,
      email: credential.user.email ?? email,
    };
    await persistCurrentUserIfNotPersisted(authInfo, collection);
    navigate("/");
  };
};

const persistCurrentUserInfo = async (
  authInfo: AuthInfo,
  collection: CollectionReference
): Promise<void> => {
  await addDoc(collection, {
    id: authInfo.id,
    email: authInfo.email,
  });
};

export const isCurrentUserPersisted = async (
  authInfo: AuthInfo,
  collection: CollectionReference
): Promise<boolean> => {
  const currentWhere = where("id", "==", authInfo.id);
  const currentQuery = query(collection, currentWhere);
  const result = await getDocs(currentQuery);

  return result.size >= 1;
};

export const persistCurrentUserIfNotPersisted = async (
  authInfo: AuthInfo,
  collection: CollectionReference
): Promise<void> => {
  const alreadyPersisted = await isCurrentUserPersisted(authInfo, collection);
  if (alreadyPersisted) {
    return;
  }

  return persistCurrentUserInfo(authInfo, collection);
};
