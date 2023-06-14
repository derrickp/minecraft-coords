import { useNavigate } from "react-router-dom";
import { PasswordForm } from "../components/PasswordForm";
import { User } from "../User";
import { useEffect } from "react";

export interface SignUpProps {
  signUpComplete: (email: string, password: string) => void;
  user?: User;
}

export const SignUp: React.FC<SignUpProps> = ({ user, signUpComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return <PasswordForm onFormComplete={signUpComplete} buttonText="Sign Up" />;
};
