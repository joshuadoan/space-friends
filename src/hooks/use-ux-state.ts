import React from "react";
import { Action, UxActionKinds, UxState } from "../types";

export default function useUxState(defaultState: UxState) {
  const [state, dispatch] = React.useReducer(
    (state: UxState, action: Action) => {
      switch (action.kind) {
        case UxActionKinds.SET_ACTORS:
          return {
            ...state,
            actors: action.payload,
          };
        case UxActionKinds.PAUSE_GAME:
          return {
            ...state,
            paused: true,
          };
        case UxActionKinds.RESUME_GAME:
          return {
            ...state,
            paused: false,
          };
        default:
          return state;
      }
    },
    defaultState
  );

  return { state, dispatch };
}
