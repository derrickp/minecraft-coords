export interface Coordinate {
  id: number;
  x: string;
  y: string;
  z: string;
  name: string;
  biome: string;
  tags: string[];
  hasVillageNearby: boolean;
  farms: string[];
}

export const parseCoordinateId = (possibleId: string): number | undefined => {
  const id = Number.parseInt(possibleId);
  if (Number.isNaN(id)) {
    return undefined;
  }
  return id;
};
