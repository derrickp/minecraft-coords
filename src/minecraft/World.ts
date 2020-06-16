import { Coordinate } from "./Coordinate";

export interface World {
  id: string;
  seed: string;
  name: string;
  coordinates: Coordinate[];
}
