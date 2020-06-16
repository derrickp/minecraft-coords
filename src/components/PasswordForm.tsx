import React, { useState } from "react";
import { Hide, View } from "grommet-icons";
import { Box, TextInput, Button, Form, FormField } from "grommet";

export interface PasswordFormProps {
  onFormComplete: (email: string, password: string) => void;
  buttonText: string;
}

export const PasswordForm = (props: PasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);

  // const buttonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   props.onFormComplete(email, password);
  // };

  const handleSubmit = (event: React.FormEvent<Element>) => {
    props.onFormComplete(email, password);
  };

  return (
    <Box width="medium">
      <Form onSubmit={handleSubmit}>
        <FormField label="Email" name="email">
          <TextInput
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormField>
        <FormField label="Password" name="password">
          <TextInput
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormField>
        <Button type="submit" label={props.buttonText} primary />
      </Form>
    </Box>
  );
};

{
  /* <form className="pure-form">
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
    </form> */
}
