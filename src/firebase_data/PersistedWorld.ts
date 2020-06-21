import { World } from "~minecraft/World";
import { Roles } from "./Roles";

export interface PersistedWorld extends World {
  roles: Roles;
}
