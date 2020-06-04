import { User } from "security/User";
import React from "react";
import { SignUp } from "./components/security/SignUp";

export interface AppProps {
  user?: User;
  signUpComplete: (email: string, password: string) => void;
}

export const App = (props: AppProps) => {
  if (props.user) {
    return <div>{props.user.email}</div>;
  } else {
    return <SignUp signUpComplete={props.signUpComplete} />
  }
};
