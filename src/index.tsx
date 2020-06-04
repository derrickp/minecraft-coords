import { config as firebaseConfig } from "./config/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { fromFirebaseUser } from "~security/User";
import ReactDOM from "react-dom";
import { App } from "./App";
import React from "react";

import "regenerator-runtime/runtime";

const element = document.getElementById("app");

if (!element) {
  console.error("Nothing is going to work now.");
}

console.log(firebaseConfig.apiKey);

const firebaseApp = firebase.initializeApp(firebaseConfig, "minecraft-coords");

async function signUp(email: string, password: string): Promise<firebase.User | null> {
  const credential = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
  return credential.user;
}

firebaseApp.auth().onAuthStateChanged(fbUser => {
  if (fbUser) {
    const user = fromFirebaseUser(fbUser);
    ReactDOM.render(<App signUpComplete={signUp} user={user} />, element);
  } else {
    ReactDOM.render(<App signUpComplete={signUp} />, element);
  }
});

ReactDOM.render(<App signUpComplete={signUp} />, element);
