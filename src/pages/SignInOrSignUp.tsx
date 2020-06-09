import React from "react";
import { useHistory } from "react-router-dom";

export const SignInOrSignUp = () => {
  const history = useHistory();

  const onSignInClick = () => {
    history.push("/sign-in");
  };

  const onSignUpClick = () => {
      history.push("sign-up");
  }

  return (
    <>
      <button
        className="pure-button pure-button-primary"
        type="button"
        onClick={onSignInClick}
      >
        Sign In
      </button>
      <br />
      <button
        className="pure-button pure-button-primary"
        type="button"
        onClick={onSignUpClick}
      >
        Sign Up
      </button>
    </>
  );
};
