import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "grommet";

export const SignInOrSignUp = (): JSX.Element => {
  const history = useHistory();

  const onSignInClick = () => {
    history.push("/sign-in");
  };

  const onSignUpClick = () => {
    history.push("/sign-up");
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
