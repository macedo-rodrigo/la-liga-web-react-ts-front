import { UserCreate } from "./User";

export interface TeamCreate {
  name: string;
  alias: string;
  players: string[];
}

export interface TeamResponse {
  _id: string;
  name: string;
  alias: string;
  players: UserCreate[];
}