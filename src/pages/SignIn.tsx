import React from "react";
import { PasswordForm } from "~components/PasswordForm";

export interface SignInProps {
  signInComplete: (email: string, password: string) => void;
}

export function SignIn(props: SignInProps): JSX.Element {
  return (
    <PasswordForm onFormComplete={props.signInComplete} buttonText="Sign In" />
  );
}
