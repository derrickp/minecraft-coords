import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { coordinateById } from "../minecraft/World";
import { parseCoordinateId } from "../minecraft/Coordinate";
import { DetailedCoordinate } from "../components/DetailedCoordinate";
import { useAuthInfo } from "../hooks/auth";
import { useWorlds } from "../hooks/worlds";

export interface ViewCoordinateRouteParams {
  worldId: string;
  coordinateId: string;
}

export const ViewCoordinate: React.FC = () => {
  const { worldId, coordinateId } = useParams();
  const navigate = useNavigate();
  const { authInfo } = useAuthInfo();
  const { worlds } = useWorlds();

  useEffect(() => {
    if (!authInfo || !worldId || !coordinateId) {
      navigate("/");
    }
  }, [authInfo, worldId, coordinateId]);

  if (!authInfo) {
    return <div>You must be logged in to see a coordinate.</div>;
  }

  if (!worldId) {
    return <div>Invalid world ID</div>;
  }

  const world = worlds?.find((w) => w.id === worldId);

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

  return <DetailedCoordinate coordinate={coordinate} />;
};
