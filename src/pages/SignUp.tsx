import React from "react";
import { PasswordForm } from "~components/PasswordForm";

export interface SignUpProps {
  signUpComplete: (email: string, password: string) => void;
}

export function SignUp(props: SignUpProps) {
  return (
    <PasswordForm onFormComplete={props.signUpComplete} buttonText="Sign Up" />
  );
}
