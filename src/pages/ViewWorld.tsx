import { useState } from "react";
import { User } from "../User";
import { useParams } from "react-router-dom";
import { Box } from "grommet";
import { Coordinate } from "../minecraft/Coordinate";
import { CoordinateList } from "../components/CoordinateList";
import { AddCoordinateForm } from "../components/AddCoordinateForm";
import { updateWorld } from "../firebase_data/worlds";
import {
  NewCoordinateDetails,
  coordinateFromDetails,
} from "../components/NewCoordinateDetails";
import { ViewWorldHeading } from "../components/ViewWorldHeading";
import { AddButton } from "../components/AddButton";
import { getNextCoordinateId, World } from "../minecraft/World";

export interface ViewWorldProps {
  user?: User;
}

export interface RouteParams {
  worldId: string;
}

export const ViewWorld: React.FC<ViewWorldProps> = ({ user }) => {
  const { worldId } = useParams();
  const [showNewCoordinate, setShowNewCoordinate] = useState(false);
  const [savingWorld, setSavingWorld] = useState(false);

  if (!user) {
    return <div>You must be logged in to see worlds.</div>;
  }

  if (!worldId) {
    return <div>Invalid world ID to view.</div>;
  }

  const world = user.worldById(worldId);
  if (!world) {
    return <div>No world with that ID.</div>;
  }

  if (savingWorld) {
    return <div>Loading...</div>;
  }

  const onCoordinateSubmitted = async (details: NewCoordinateDetails) => {
    const coordinate = coordinateFromDetails(
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
          />
        ) : (
          <Box>
            <ViewWorldHeading world={world} />
            <CoordinateList
              coordinates={world.coordinates}
              worldId={world.id}
            />
            <AddButton
              text="Add New Coordinate"
              onClick={() => setShowNewCoordinate(true)}
            />
          </Box>
        )}
      </Box>
    </>
  );
};
