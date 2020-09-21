import React from "react";
import { PasswordForm } from "../components/PasswordForm";

export interface SignUpProps {
  signUpComplete: (email: string, password: string) => void;
}

export function SignUp(props: SignUpProps): JSX.Element {
  return (
    <PasswordForm onFormComplete={props.signUpComplete} buttonText="Sign Up" />
  );
}
