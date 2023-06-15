import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "grommet";
import { useAuthInfo } from "../hooks/auth";

export const SignInOrSignUp: React.FC = () => {
  const navigate = useNavigate();

  const onSignInClick = () => {
    navigate("/sign-in");
  };

  const onSignUpClick = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <Box align="center" pad="medium">
        <Button size="large" label="Sign In" onClick={onSignInClick}></Button>
      </Box>
      <Box align="center" pad="medium">
        <Button size="large" label="Sign Up" onClick={onSignUpClick}></Button>
      </Box>
    </>
  );
};
