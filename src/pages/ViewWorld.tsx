import React, { useState } from "react";
import { User } from "~User";
import { useParams } from "react-router-dom";
import { World } from "~minecraft/World";
import { Box, Heading, Text, Button } from "grommet";
import { Add } from "grommet-icons";
import { Coordinate } from "~minecraft/Coordinate";
import { CoordinateList } from "~components/CoordinateList";
import { AddCoordinateForm } from "~components/AddCoordinateForm";
import { updateWorld } from "~firebase_data/worlds";
import {
  NewCoordinateDetails,
  coordinateFromDetails,
} from "~components/NewCoordinateDetails";

export interface ViewWorldProps {
  user: User;
}

type MaybeCoordinate = Coordinate | undefined;

export const ViewWorld = (props: ViewWorldProps): JSX.Element => {
  const { worldId } = useParams();
  const world = worldFromId(worldId, props.user);
  const [showNewCoordinate, setShowNewCoordinate] = useState(false);
  const [savingWorld, setSavingWorld] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState<MaybeCoordinate>(
    undefined
  );

  if (!world) {
    return <div>No world with that ID.</div>;
  }

  if (savingWorld) {
    return <div>Loading...</div>;
  }

  const onCoordinateSubmitted = async (details: NewCoordinateDetails) => {
    const coordinate: Coordinate = coordinateFromDetails(details);
    world.coordinates.push(coordinate);
    setSavingWorld(true);
    await updateWorld(world);
    setShowNewCoordinate(false);
    setSavingWorld(false);
  };

  console.log(selectedCoordinate);

  return (
    <>
      <Box margin="small" justify="start">
        <Heading level={4}>Name</Heading>
        <Text>{world.name}</Text>
      </Box>
      <Box margin="small" justify="start">
        <Heading level={4}>Seed</Heading>
        <Text>{world.seed}</Text>
      </Box>
      {showNewCoordinate ? (
        <AddCoordinateForm
          onCancel={() => setShowNewCoordinate(false)}
          onCoordinateSubmitted={onCoordinateSubmitted}
        ></AddCoordinateForm>
      ) : (
        <Box>
          <CoordinateList
            coordinates={world.coordinates}
            coordinateClicked={(coordinate) =>
              setSelectedCoordinate(coordinate)
            }
          ></CoordinateList>
          <Button
            hoverIndicator="dark-1"
            onClick={() => setShowNewCoordinate(true)}
            {...props}
          >
            <Box pad="small" direction="row" align="center" gap="small">
              <Add />
              <Text>Add New Coordinate</Text>
            </Box>
          </Button>
        </Box>
      )}
    </>
  );
};

function worldFromId(id: string, user: User): World | undefined {
  return user.worlds.find((w) => w.id == id);
}
