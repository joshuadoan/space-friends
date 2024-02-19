import { Meeple } from "./classes/Meeple";
import Game from "./classes/foo";

export type Tab = "meeples" | "help";

export type UxState = {
  actors: Meeple[];
  paused: boolean;
};

export enum UxActionKinds {
  SET_ACTORS = "SET_ACTORS",
  PAUSE_GAME = "PAUSE_GAME",
  RESUME_GAME = "RESUME_GAME",
}

type SetActors = {
  kind: UxActionKinds.SET_ACTORS;
  payload: Meeple[];
};

type PauseGame = {
  kind: UxActionKinds.PAUSE_GAME;
};

type ResumeGame = {
  kind: UxActionKinds.RESUME_GAME;
};

export type Action = SetActors | PauseGame | ResumeGame;

export type OutletContext = {
  game: Game;
  state: UxState;
  dispatch: React.Dispatch<Action>;
};
