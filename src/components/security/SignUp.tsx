import React, { useState } from "react";

export interface SignUpProps {
  signUpComplete: (email: string, password: string) => void;
}

export function SignUp(props: SignUpProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.signUpComplete(email, password);
  }

  return (
    <form>
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
      <button type="submit" onClick={buttonClicked}>Done</button>
    </form>
  );
}
