import { FirebaseApp, initializeApp } from "firebase/app";

import { config } from "../config/firebase";

let app: FirebaseApp;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(config, "minecraft-coords");
  }
  return app;
}

function setAppAtLoad() {
  if (!app) {
    app = initializeApp(config, "minecraft-coords");
  }
}
setAppAtLoad();
