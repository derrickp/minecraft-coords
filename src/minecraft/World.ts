import { Coordinate } from "./Coordinate";
import { Platform } from "./Platform";

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
