import React from "react";
import { Action, UxActionKinds, UxState } from "../types";
import { MAX_ZOOM, MIN_ZOOM } from "../classes/Base";
import Game from "../classes/Game";
import Button from "./Button";
import { Legend } from "../classes/Legend";

export const Footer = (props: {
  state: UxState;
  dispatch: React.Dispatch<Action>;
  game: Game;
}) => {
  return (
    <footer className="flex items-center gap-4 justify-end p-4 ">
      <Legend state={props.state} />
      <Button>Drag me</Button>
      {props.state.paused ? (
        <Button
          title="pause"
          onClick={() =>
            props.dispatch({
              kind: UxActionKinds.RESUME_GAME,
            })
          }
        >
          play
        </Button>
      ) : (
        <Button
          title="play"
          onClick={() =>
            props.dispatch({
              kind: UxActionKinds.PAUSE_GAME,
            })
          }
        >
          pause
        </Button>
      )}
      <div className="flex flex-col items-center gap-2 ">
        <input
          disabled={!!props.state.paused}
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          title={props.state.zoom.toString()}
          value={props.state.zoom}
          className="range bg-purple-600 disabled:opacity-70"
          onChange={(e) => {
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
    </footer>
  );
};
