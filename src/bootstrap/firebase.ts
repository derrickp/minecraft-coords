import firebase from "firebase/app";

// Side-effect imports
import "regenerator-runtime/runtime";
import "firebase/auth";

import { config } from "../config/firebase";

export function getFirebaseApp() {
  return firebase.initializeApp(config, "minecraft-coords");
}
