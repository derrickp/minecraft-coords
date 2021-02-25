import firebase from "firebase/app";

// Side-effect imports
import "firebase/auth";
import "firebase/firestore";

import { config } from "../config/firebase";

let app: firebase.app.App;

export function getFirebaseApp(): firebase.app.App {
  if (!app) {
    app = firebase.initializeApp(config, "minecraft-coords");
  }
  return app;
}

function setAppAtLoad() {
  if (!app) {
    app = firebase.initializeApp(config, "minecraft-coords");
  }
}
setAppAtLoad();
