import React from "react";
import { Action, ActionNames, State } from "../types";

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
