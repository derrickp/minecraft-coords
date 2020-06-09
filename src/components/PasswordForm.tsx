import React, { useState } from "react";

export interface PasswordFormProps {
  onFormComplete: (email: string, password: string) => void;
  buttonText: string;
}

export const PasswordForm = (props: PasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onFormComplete(email, password);
  };

  return (
    <form className="pure-form">
      <fieldset>
        <input
          type="email"
          value={email}
          autoComplete="username"
          onChange={(evt) => setEmail(evt.currentTarget.value)}
        />
        <input
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(evt) => setPassword(evt.currentTarget.value)}
        />
        <button
          type="submit"
          onClick={buttonClicked}
          className="pure-button pure-button-primary"
        >
          {props.buttonText}
        </button>
      </fieldset>
    </form>
  );
};
