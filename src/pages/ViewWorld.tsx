import React, { useState } from "react";
import { User, MaybeUser } from "~User";
import { useParams } from "react-router-dom";
import { World } from "~minecraft/World";
import { Box } from "grommet";
import { Coordinate } from "~minecraft/Coordinate";
import { CoordinateList } from "~components/CoordinateList";
import { AddCoordinateForm } from "~components/AddCoordinateForm";
import { updateWorld } from "~firebase_data/worlds";
import {
  NewCoordinateDetails,
  coordinateFromDetails,
} from "~components/NewCoordinateDetails";
import { ViewWorldHeading } from "~components/ViewWorldHeading";
import { AddButton } from "~components/AddButton";

export interface ViewWorldProps {
  user: MaybeUser;
}

type MaybeCoordinate = Coordinate | undefined;

export const ViewWorld = (props: ViewWorldProps): JSX.Element => {
  const { worldId } = useParams();
  const [showNewCoordinate, setShowNewCoordinate] = useState(false);
  const [savingWorld, setSavingWorld] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState<MaybeCoordinate>(
    undefined
  );

  if (!props.user) {
    return <div>You must be logged in to see worlds.</div>;
  }

  const world = worldFromId(worldId, props.user);
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
        {showNewCoordinate ? (
          <AddCoordinateForm
            onCancel={() => setShowNewCoordinate(false)}
            onCoordinateSubmitted={onCoordinateSubmitted}
            worldName={world.name}
          ></AddCoordinateForm>
        ) : (
          <Box>
            <ViewWorldHeading world={world}></ViewWorldHeading>
            <CoordinateList
              coordinates={world.coordinates}
              coordinateClicked={(coordinate) =>
                setSelectedCoordinate(coordinate)
              }
            ></CoordinateList>
            <AddButton
              text="Add New Coordinate"
              onClick={() => setShowNewCoordinate(true)}
            ></AddButton>
          </Box>
        )}
      </Box>
    </>
  );
};

function worldFromId(id: string, user: User): World | undefined {
  return user.worlds.find((w) => w.id == id);
}
