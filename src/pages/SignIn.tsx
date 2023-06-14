import React, { useEffect } from "react";
import { PasswordForm } from "../components/PasswordForm";
import { User } from "../User";
import { useNavigate } from "react-router-dom";

export interface SignInProps {
  signInComplete: (email: string, password: string) => void;
  user?: User;
}

export const SignIn: React.FC<SignInProps> = ({ user, signInComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return <PasswordForm onFormComplete={signInComplete} buttonText="Sign In" />;
};
