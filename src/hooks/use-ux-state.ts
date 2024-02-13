import React from "react";
import { MeepleClass } from "../classes/meeple";

export type Filter = "ships" | "destinations" | "homes";
export type Tab = "meeples" | "help";

export type State = {
  selectedActor: MeepleClass | null;
  actors: MeepleClass[];
};

export enum ActionNames {
  SET_ACTORS = "SET_ACTORS",
}

type SetActors = {
  name: ActionNames.SET_ACTORS;
  payload: MeepleClass[];
};

export type Action = SetActors;

export default function useUxState(defaultState: State) {
  const [state, dispatch] = React.useReducer((state: State, action: Action) => {
    switch (action.name) {
      case ActionNames.SET_ACTORS:
        return {
          ...state,
          actors: action.payload,
        };
      default:
        return state;
    }
  }, defaultState);

  return { state, dispatch };
}
