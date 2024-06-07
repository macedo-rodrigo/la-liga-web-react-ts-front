import { TeamResponse } from "./Team"; 

export interface MatchCreate {
  local: string;
  visitor: string;
  date: Date;
  localScore: string;
  visitorScore: number;
  winner: string;
}

export interface MatchResponse {
  _id: string;
  local: TeamResponse;
  visitor: TeamResponse;
  date: Date;
  localScore: number;
  visitorScore: number;
  winner: TeamResponse;
}