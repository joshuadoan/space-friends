import Game from "./classes/game";
import { MeepleClass } from "./classes/meeple";

export type MeepleState = ShipState | DestinationState;
export type MeepleActionKind = ShipActionKind | DestinationActionKind;

export enum MeepleKind {
  SpaceLaborer = "space laborer",
  SpaceShop = "space shop",
  Home = "home",
  Unknown = "unknown",
}

export enum ShipState {
  Off = "off",
  TravelingToWork = "traveling to work",
  TravelingHome = "traveling home",
  Working = "working",
  AtHome = "home",
}

export enum ShipActionKind {
  GoToWork = "go to work",
  GoHome = "go home",
  Work = "start working",
  Hangout = "hang out at home",
}

export type MeepleAction = {
  kind: MeepleActionKind;
  effect: () => void;
};

export enum DestinationState {
  Open = "open",
  Closed = "closed",
}

export enum DestinationActionKind {
  Open = "open",
  Close = "close",
}

export type Journal = {
  [timeStamp: number]: string;
};

export type Status = {
  health: number;
  stuff: number;
  lights: Lights;
};

export enum Lights {
  On = "on",
  Off = "off",
}

export type Filter = "ships" | "destinations" | "homes";
export type Tab = "meeples" | "help";

export type UxState = {
  selectedActor: MeepleClass | null;
  actors: MeepleClass[];
  paused: boolean;
};

export enum UxActionKinds {
  SET_ACTORS = "SET_ACTORS",
  PAUSE_GAME = "PAUSE_GAME",
  RESUME_GAME = "RESUME_GAME",
}

type SetActors = {
  kind: UxActionKinds.SET_ACTORS;
  payload: MeepleClass[];
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
