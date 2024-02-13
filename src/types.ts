import Game from "./classes/game";
import { MeepleClass } from "./classes/meeple";

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

export type ShipAction = {
  kind: ShipActionKind;
  effect: () => void;
};

export enum DestinationState {
  Open = "open",
  Closed = "closed",
}

export enum DestinationAction {
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

export type State = {
  selectedActor: MeepleClass | null;
  actors: MeepleClass[];
  paused: boolean;
};

export enum ActionNames {
  SET_ACTORS = "SET_ACTORS",
  PAUSE_GAME = "PAUSE_GAME",
  RESUME_GAME = "RESUME_GAME",
}

type SetActors = {
  name: ActionNames.SET_ACTORS;
  payload: MeepleClass[];
};

type PauseGame = {
  name: ActionNames.PAUSE_GAME;
};

type ResumeGame = {
  name: ActionNames.RESUME_GAME;
};

export type Action = SetActors | PauseGame | ResumeGame;

export type OutletContext = {
  game: Game;
  state: State;
  dispatch: React.Dispatch<Action>;
};
