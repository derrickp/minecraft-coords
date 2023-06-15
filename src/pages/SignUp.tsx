import { useNavigate } from "react-router-dom";
import { PasswordForm } from "../components/PasswordForm";
import { useEffect } from "react";
import { useAuthInfo, useSignUp } from "../hooks/auth";

export interface SignUpProps {
  signUpComplete: (email: string, password: string) => void;
}

export const SignUp: React.FC = () => {
  const signUp = useSignUp();

  return <PasswordForm onFormComplete={signUp} buttonText="Sign Up" />;
};
