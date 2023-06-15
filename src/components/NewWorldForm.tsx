import { FC, useState } from "react";
import { Platform } from "../minecraft/Platform";
import { Form, FormField, TextInput, Select, Box, Button } from "grommet";

export interface NewWorldDetails {
  id: string;
  name: string;
  seed: string;
  platform: Platform;
}

export interface NewWorldFormProps {
  onWorldSubmitted: (details: NewWorldDetails) => void;
  onCancel: () => void;
}

export const NewWorldForm: FC<NewWorldFormProps> = ({
  onCancel,
  onWorldSubmitted,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [seed, setSeed] = useState("");
  const [platform, setPlatform] = useState(Platform.BEDROCK);

  const onSubmit = () => {
    onWorldSubmitted({
      id,
      name,
      seed,
      platform,
    });
  };

  return (
    <Form
      onReset={() => {
        setId("");
        setName("");
        setSeed("");
      }}
      onSubmit={onSubmit}
    >
      <FormField
        label="World ID (A helpful reference identifier for you)"
        name="id"
      >
        <TextInput
          name="id"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
      </FormField>
      <FormField label="World Name" name="name">
        <TextInput
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FormField>
      <FormField label="World Seed" name="seed">
        <TextInput
          name="seed"
          value={seed}
          onChange={(event) => setSeed(event.target.value)}
        />
      </FormField>
      <FormField label="Platform" name="platform">
        <Select
          name="platform"
          options={[Platform.BEDROCK, Platform.JAVA]}
          value={platform}
          onChange={(event) => setPlatform(event.option)}
        />
      </FormField>
      <Box direction="row" justify="between" margin={{ top: "medium" }}>
        <Button label="Cancel" onClick={onCancel} />
        <Button type="reset" label="Reset Form" />
        <Button type="submit" label="Save World" primary />
      </Box>
    </Form>
  );
};
