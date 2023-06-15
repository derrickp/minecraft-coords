import { useNavigate, useParams } from "react-router-dom";
import { AddCoordinateForm } from "../components/AddCoordinateForm";
import { useCallback } from "react";
import {
  NewCoordinateDetails,
  coordinateFromDetails,
} from "../components/NewCoordinateDetails";
import { useUpdateWorld, useWorld } from "../hooks/worlds";
import { getNextCoordinateId } from "../minecraft/World";

export const AddCoordinate: React.FC = () => {
  const { worldId } = useParams();
  const navigate = useNavigate();
  const { world } = useWorld(worldId);
  const updateWorld = useUpdateWorld();

  const onCoordSubmitted = useCallback(
    async (details: NewCoordinateDetails) => {
      if (!world) {
        return;
      }

      const coordinate = coordinateFromDetails(
        getNextCoordinateId(world),
        details
      );

      if (!world.coordinates) {
        world.coordinates = [];
      }

      world.coordinates.push(coordinate);
      await updateWorld(world);
      navigate(`/worlds/${world.id}`);
    },
    [updateWorld, world, navigate]
  );

  if (!world) {
    return <div>No world with that ID.</div>;
  }

  return (
    <>
      <AddCoordinateForm
        onCancel={() => navigate(-1)}
        onCoordinateSubmitted={onCoordSubmitted}
        worldName={world?.name ?? ""}
      />
    </>
  );
};
