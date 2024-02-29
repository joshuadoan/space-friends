import React from "react";
import { UxAction, UxActionKinds, UxState } from "../types";

export default function useUxState(defaultState: UxState) {
  const [state, dispatch] = React.useReducer(
    (state: UxState, action: UxAction) => {
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
        case UxActionKinds.SET_ZOOM:
          return {
            ...state,
            zoom: action.payload,
          };
        case UxActionKinds.SET_CAMERA_DIRECTION:
          return {
            ...state,
            cameraDirection: action.payload,
          };
        default:
          return state;
      }
    },
    defaultState
  );

  return { state, dispatch };
}
