import React from "react";
import { MeepleClass } from "../classes/meeple";

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

export default function useUxState(defaultState: State) {
  const [state, dispatch] = React.useReducer((state: State, action: Action) => {
    switch (action.name) {
      case ActionNames.SET_ACTORS:
        return {
          ...state,
          actors: action.payload,
        };
      case ActionNames.PAUSE_GAME:
        return {
          ...state,
          paused: true,
        };
      case ActionNames.RESUME_GAME:
        return {
          ...state,
          paused: false,
        };
      default:
        return state;
    }
  }, defaultState);

  return { state, dispatch };
}
