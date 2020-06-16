import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { User } from "~User";
import { App } from "~App";
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

function renderApp(user?: User) {
  render(
    <BrowserRouter>
      <App
        signUpComplete={signUp}
        user={user}
        signInComplete={signIn}
        signOut={signOut}
      />
    </BrowserRouter>,
    element
  );
}

subscribeToUserChanges((basicInfo) => {
  if (basicInfo) {
    const user: User = {
      basicInfo,
    };
    renderApp(user);
    return;
  }
  renderApp(undefined);
});

renderApp();
