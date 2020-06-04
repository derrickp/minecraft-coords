import firebase from "firebase/app";

// Side-effect imports
import "regenerator-runtime/runtime";
import "firebase/auth";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { config as firebaseConfig } from "~/config/firebase";
import { fromFirebaseUser, User } from "~security/User";
import { App } from "~/App";

const element = document.getElementById("app");

if (!element) {
  console.error("Nothing is going to work now.");
}

const firebaseApp = firebase.initializeApp(firebaseConfig, "minecraft-coords");

async function signUp(
  email: string,
  password: string
): Promise<firebase.User | null> {
  const credential = await firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password);
  return credential.user;
}

function renderApp(user?: User) {
  render(
    <BrowserRouter>
      <App signUpComplete={signUp} user={user} />
    </BrowserRouter>,
    element
  );
}

firebaseApp.auth().onAuthStateChanged((fbUser) => {
  if (fbUser) {
    const user = fromFirebaseUser(fbUser);
    renderApp(user);
  } else {
    renderApp();
  }
});

renderApp();
