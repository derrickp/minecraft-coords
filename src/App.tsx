import { User } from "security/User";
import React from "react";
import { SignUp } from "~pages/SignUp";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "~pages/Home";
import { SignIn } from "~pages/SignIn";
import { SignInOrSignUp } from "~pages/SignInOrSignUp";

export interface AppProps {
  user?: User;
  signUpComplete: (email: string, password: string) => void;
  signInComplete: (email: string, password: string) => void;
}

export const App = (props: AppProps) => {
  const { user } = props;
  const loggedIn = !!user;

  return (
    <Switch>
      <Route exact path="/">
        {loggedIn ? <Home user={user!} /> : <Redirect to="/sign-in-or-up" />}
      </Route>
      <Route path="/sign-in-or-up">
        {loggedIn ? <Redirect to="/" /> : <SignInOrSignUp />}
      </Route>
      <Route path="/sign-up">
        {loggedIn ? (
          <Redirect to="/" />
        ) : (
          <SignUp signUpComplete={props.signUpComplete} />
        )}
      </Route>
      <Route path="/sign-in">
        {loggedIn ? (
          <Redirect to="/" />
        ) : (
          <SignIn signInComplete={props.signInComplete} />
        )}
      </Route>
    </Switch>
  );
};
