import React, { useEffect } from "react";
import { PasswordForm } from "../components/PasswordForm";
import { useNavigate } from "react-router-dom";
import { useAuthInfo, useSignIn } from "../hooks/auth";

export const SignIn: React.FC = () => {
  const signIn = useSignIn();

  return <PasswordForm onFormComplete={signIn} buttonText="Sign In" />;
};
