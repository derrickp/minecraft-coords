import { FC } from "react";
import { PasswordForm } from "../components/PasswordForm";
import { useSignIn } from "../hooks/auth";

export const SignIn: FC = () => {
  const signIn = useSignIn();

  return <PasswordForm onFormComplete={signIn} buttonText="Sign In" />;
};
