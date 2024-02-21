import { Meeple } from "./classes/Meeple";
import Game from "./classes/Game";

export type Tab = "meeples" | "help";

export type UxState = {
  actors: Meeple[];
  paused: boolean;
  zoom: number;
};

export enum UxActionKinds {
  SET_ACTORS = "SET_ACTORS",
  PAUSE_GAME = "PAUSE_GAME",
  RESUME_GAME = "RESUME_GAME",
  SET_ZOOM = "SET_ZOOM",
}

type SetActors = {
  kind: UxActionKinds.SET_ACTORS;
  payload: Meeple[];
};

type SetZoom = {
  kind: UxActionKinds.SET_ZOOM;
  payload: number;
};

type PauseGame = {
  kind: UxActionKinds.PAUSE_GAME;
};

type ResumeGame = {
  kind: UxActionKinds.RESUME_GAME;
};

export type Action = SetActors | PauseGame | ResumeGame | SetZoom;

export type OutletContext = {
  game: Game;
  state: UxState;
  dispatch: React.Dispatch<Action>;
};

export enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}
