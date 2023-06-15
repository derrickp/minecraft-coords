import { FC, useState } from "react";
import {
  Form,
  FormField,
  TextInput,
  Box,
  Button,
  Heading,
  CheckBox,
} from "grommet";
import { NewCoordinateDetails } from "./NewCoordinateDetails";

export interface AddCoordinateFormProps {
  worldName: string;
  onCoordinateSubmitted: (coordinate: NewCoordinateDetails) => void;
  onCancel: () => void;
}

export const AddCoordinateForm: FC<AddCoordinateFormProps> = (props) => {
  const [x, setX] = useState<string>("");
  const [y, setY] = useState<string>("");
  const [z, setZ] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [biome, setBiome] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [farms, setFarms] = useState<string[]>([]);
  const [hasVillageNearby, setHasVillage] = useState(false);

  const onSubmit = () => {
    props.onCoordinateSubmitted({
      x,
      y,
      z,
      name,
      tags,
      biome,
      farms,
      hasVillageNearby,
    });
  };

  return (
    <Box>
      <Heading level={4}>{`New coordinate for ${props.worldName}`}</Heading>
      <Form
        onReset={() => {
          setX("");
          setY("");
          setZ("");
          setTags([]);
          setFarms([]);
          setHasVillage(false);
        }}
        onSubmit={onSubmit}
      >
        <FormField label="Coordinate Name" name="name">
          <TextInput
            name="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FormField>
        <FormField label="X" name="x">
          <TextInput
            name="X"
            value={x}
            onChange={(event) => setX(event.target.value)}
          />
        </FormField>
        <FormField label="Y" name="y">
          <TextInput
            name="y"
            value={y}
            onChange={(event) => setY(event.target.value)}
          />
        </FormField>
        <FormField label="Z" name="z">
          <TextInput
            name="z"
            value={z}
            onChange={(event) => setZ(event.target.value)}
          />
        </FormField>
        <FormField label="Biome" name="biome">
          <TextInput
            name="biome"
            value={biome}
            onChange={(event) => setBiome(event.target.value)}
          />
        </FormField>
        <FormField name="hasVillageNearby">
          <CheckBox
            name="hasVillageNearby"
            label="Has Village Nearby?"
            checked={hasVillageNearby}
            onChange={(event) => setHasVillage(event.target.checked)}
          />
        </FormField>
        <FormField label="Farms close by (comma separated)" name="amenities">
          <TextInput
            name="farms"
            value={farms.join(",")}
            onChange={(event) => setFarms(event.target.value.split(","))}
          />
        </FormField>
        <FormField label="Tags (separate by ,)" name="tags">
          <TextInput
            name="tags"
            value={tags.join(",")}
            onChange={(event) => setTags(event.target.value.split(","))}
          />
        </FormField>
        <Box direction="row" justify="between" margin={{ top: "medium" }}>
          <Button label="Cancel" onClick={props.onCancel} />
          <Button type="reset" label="Reset" />
          <Button type="submit" label="Save Coordinate" primary />
        </Box>
      </Form>
    </Box>
  );
};
