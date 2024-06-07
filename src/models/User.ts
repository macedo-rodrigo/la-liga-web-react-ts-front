import { TeamResponse } from "./Team";

export enum ROL {
  PLAYER = "PLAYER",
  CAPTAIN = "CAPTAIN",
  ADMIN = "ADMIN",
}

export interface UserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: ROL;
  team?: string;
}

export interface UserResponse {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: ROL;
  team?: string | TeamResponse;
}