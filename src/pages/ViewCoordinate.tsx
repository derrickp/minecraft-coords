import React, { useState } from "react";
import { MaybeUser, worldById } from "~User";
import { useParams } from "react-router-dom";
import { coordinateById } from "~minecraft/World";
import { parseCoordinateId } from "~minecraft/Coordinate";
import { VillagerTrade } from "~minecraft/VillagerTrade";
import { updateWorld } from "~firebase_data/worlds";
import { DetailedCoordinate } from "~components/DetailedCoordinate";

export interface ViewCoordinateProps {
  user: MaybeUser;
}

export const ViewCoordinate = (props: ViewCoordinateProps): JSX.Element => {
  const { worldId, coordinateId } = useParams();
  const { user } = props;
  const [isSavingCoordinate, setSavingCoordinate] = useState(false);

  if (!user) {
    return <div>You must be logged in to see a coordinate.</div>;
  }

  const world = worldById(user, worldId);

  if (!world) {
    return (
      <div>{`You do not have access to the world with id ${worldId}`}</div>
    );
  }

  const actualCoordinateId = parseCoordinateId(coordinateId);
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

  const addVillagerTrade = async (villagerTrade: VillagerTrade) => {
    coordinate.villagerTrades.push(villagerTrade);
    setSavingCoordinate(true);
    await updateWorld(world);
    setSavingCoordinate(false);
  };

  const editVillagerTrade = async (
    index: number,
    villagerTrade: VillagerTrade
  ) => {
    coordinate.villagerTrades.splice(index, 1, villagerTrade);
    setSavingCoordinate(true);
    await updateWorld(world);
    setSavingCoordinate(false);
  };

  return (
    <DetailedCoordinate
      coordinate={coordinate}
      villagerTradeAdded={addVillagerTrade}
      villageTradeEdited={editVillagerTrade}
    ></DetailedCoordinate>
  );
};
