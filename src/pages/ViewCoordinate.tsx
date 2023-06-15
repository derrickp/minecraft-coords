import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { coordinateById } from "../minecraft/World";
import { parseCoordinateId } from "../minecraft/Coordinate";
import { DetailedCoordinate } from "../components/DetailedCoordinate";
import { User } from "../User";

export interface ViewCoordinateProps {
  user?: User;
}

export interface ViewCoordinateRouteParams {
  worldId: string;
  coordinateId: string;
}

export const ViewCoordinate: React.FC<ViewCoordinateProps> = ({ user }) => {
  const { worldId, coordinateId } = useParams();
  const navigate = useNavigate();
  const [isSavingCoordinate, setSavingCoordinate] = useState(false);

  useEffect(() => {
    if (!user || !worldId || !coordinateId) {
      navigate("/");
    }
  }, [user, worldId, coordinateId]);

  if (!user) {
    return <div>You must be logged in to see a coordinate.</div>;
  }

  if (!worldId) {
    return <div>Invalid world ID</div>;
  }

  const world = user.worldById(worldId);

  if (!world) {
    return (
      <div>{`You do not have access to the world with id ${worldId}`}</div>
    );
  }

  const actualCoordinateId = parseCoordinateId(coordinateId!);
  if (!actualCoordinateId) {
    return <div>{`${coordinateId} is not a valid coordinate id`}</div>;
  }

  const coordinate = coordinateById(world, actualCoordinateId);

  if (!coordinate) {
    return (
      <div>{`Unfortunately no coordinate exists with id ${coordinateId} in specified world`}</div>
    );
  }

  if (isSavingCoordinate) {
    return <div>Saving world...</div>;
  }

  return <DetailedCoordinate coordinate={coordinate} />;
};
