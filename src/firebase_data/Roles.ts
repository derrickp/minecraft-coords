export interface Roles {
  [key: string]: Role;
}

export enum Role {
  OWNER = "owner",
  WRITER = "writer",
}
