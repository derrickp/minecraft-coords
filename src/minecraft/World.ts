import { Coordinate } from "./Coordinate";

export interface World {
  seed: string;
  name: string;
  coordinates: Coordinate[];
}
