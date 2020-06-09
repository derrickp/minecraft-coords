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

async function signIn(
  email: string,
  password: string
): Promise<firebase.User | null> {
  const credential = await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password);
  return credential.user;
}

async function signOut(): Promise<void> {
  return firebaseApp.auth().signOut();
}

(window as any)["signout"] = signOut;

function renderApp(user?: User) {
  render(
    <BrowserRouter>
      <App signUpComplete={signUp} user={user} signInComplete={signIn} />
    </BrowserRouter>,
    element
  );
}

firebaseApp.auth().onAuthStateChanged((fbUser) => {
  console.log("auth changed");
  if (fbUser) {
    const user = fromFirebaseUser(fbUser);
    renderApp(user);
  } else {
    renderApp();
  }
});

renderApp();
