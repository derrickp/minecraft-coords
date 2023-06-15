import { useState } from "react";
import { Box, TextInput, Button, Form, FormField } from "grommet";

export interface PasswordFormProps {
  onFormComplete: (email: string, password: string) => void;
  buttonText: string;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  buttonText,
  onFormComplete,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onFormComplete(email, password);
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
        <Button type="submit" label={buttonText} primary />
      </Form>
    </Box>
  );
};
