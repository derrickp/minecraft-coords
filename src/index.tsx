import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { User } from "~security/User";
import { App } from "~/App";
import {
  signOut,
  signUp,
  signIn,
  subscribeToUserChanges,
} from "~security/authentication";

const element = document.getElementById("app");

if (!element) {
  console.error("Nothing is going to work now.");
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

subscribeToUserChanges((user) => {
  renderApp(user);
});

renderApp();
