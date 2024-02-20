import React from "react";
import { Action, UxActionKinds, UxState } from "../types";
import { MAX_ZOOM, MIN_ZOOM } from "../classes/Meeple";

export const Controls = (props: {
  state: UxState;
  dispatch: React.Dispatch<Action>;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 absolute right-4 bottom-4">
      <input
        type="range"
        min={MIN_ZOOM}
        max={MAX_ZOOM}
        value={props.state.zoom}
        className="range bg-purple-600"
        onChange={(e) => {
          console.log(e.target.value);
          props.dispatch({
            kind: UxActionKinds.SET_ZOOM,
            payload: parseFloat(e.target.value),
          });
        }}
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
    </div>
  );
};
