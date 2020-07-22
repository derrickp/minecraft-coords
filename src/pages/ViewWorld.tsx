import React, { useState } from "react";
import { MaybeUser, worldById } from "~User";
import { useParams, useHistory } from "react-router-dom";
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
import { getNextCoordinateId, World } from "~minecraft/World";

export interface ViewWorldProps {
  user: MaybeUser;
}

export const ViewWorld = (props: ViewWorldProps): JSX.Element => {
  const { worldId } = useParams();
  const [showNewCoordinate, setShowNewCoordinate] = useState(false);
  const [savingWorld, setSavingWorld] = useState(false);

  const history = useHistory();

  if (!props.user) {
    return <div>You must be logged in to see worlds.</div>;
  }

  const world = worldById(props.user, worldId);
  if (!world) {
    return <div>No world with that ID.</div>;
  }

  if (savingWorld) {
    return <div>Loading...</div>;
  }

  const onCoordinateSubmitted = async (details: NewCoordinateDetails) => {
    const coordinate: Coordinate = coordinateFromDetails(
      getNextCoordinateId(world),
      details
    );

    if (!world.coordinates) {
      world.coordinates = [];
    }

    world.coordinates.push(coordinate);
    setSavingWorld(true);
    await updateWorld(world);
    setShowNewCoordinate(false);
    setSavingWorld(false);
  };

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
                history.push(getCoordinateUrl(world, coordinate))
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

function getCoordinateUrl(world: World, coordinate: Coordinate): string {
  return `/worlds/${world.id}/coordinates/${coordinate.id}`;
}
