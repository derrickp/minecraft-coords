import { Coordinate } from "./Coordinate";
import { Platform } from "./Platform";

export type MaybeWorld = World | undefined;

export interface World {
  id: string;
  seed: string;
  name: string;
  platform: Platform;
  coordinates: Coordinate[];
  owner: string;
  collaborators: string[];
  storageId?: string;
}

export interface BuildWorldArgs {
  idUniqueifier: string;
  id: string;
  seed: string;
  name: string;
  coordinates?: Coordinate[];
  platform?: Platform;
}

export function getFriendlyId(id: string): string {
  const parts = id.split("-");
  return parts[1];
}

export function getNextCoordinateId(world: World): number {
  if (!world.coordinates) {
    return 1;
  }

  const existingMax = world.coordinates.sort((a, b) => a.id - b.id)[
    world.coordinates.length - 1
  ];

  if (existingMax && existingMax.id) {
    return existingMax.id + 1;
  }

  return 1;
}

export function coordinateById(
  world: World,
  coordinateId: number
): Coordinate | undefined {
  return world.coordinates.find((c) => c.id == coordinateId);
}

export function buildWorld({
  idUniqueifier,
  id,
  seed,
  name,
  platform = Platform.BEDROCK,
  coordinates = [],
}: BuildWorldArgs): World {
  return {
    seed,
    name,
    platform,
    owner: idUniqueifier,
    collaborators: [],
    id: `${idUniqueifier}-${id}`,
    coordinates: coordinates,
  };
}
