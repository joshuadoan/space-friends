import { Base } from "./classes/base";
import Game from "./classes/game";

export type Tab = "meeples" | "help";

export type UxState = {
  actors: Base[];
  paused: boolean;
};

export enum UxActionKinds {
  SET_ACTORS = "SET_ACTORS",
  PAUSE_GAME = "PAUSE_GAME",
  RESUME_GAME = "RESUME_GAME",
}

type SetActors = {
  kind: UxActionKinds.SET_ACTORS;
  payload: Base[];
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
