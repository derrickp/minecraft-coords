import { PasswordForm } from "../components/PasswordForm";
import { FC } from "react";
import { useSignUp } from "../hooks/auth";

export interface SignUpProps {
  signUpComplete: (email: string, password: string) => void;
}

export const SignUp: FC = () => {
  const signUp = useSignUp();

  return <PasswordForm onFormComplete={signUp} buttonText="Sign Up" />;
};
