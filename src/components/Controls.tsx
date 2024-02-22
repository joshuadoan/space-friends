import React, { useEffect } from "react";
import { Action, Direction, UxActionKinds, UxState } from "../types";
import { MAX_ZOOM, MIN_ZOOM } from "../classes/Meeple";
import Game from "../classes/Game";

export const Controls = (props: {
  state: UxState;
  dispatch: React.Dispatch<Action>;
  game: Game;
}) => {
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      event.preventDefault();
      switch (event.key) {
        case "ArrowUp":
        case "w":
          props.game.panCamera(Direction.Up);
          break;
        case "ArrowDown":
        case "s":
          props.game.panCamera(Direction.Down);
          break;
        case "ArrowLeft":
        case "a":
          props.game.panCamera(Direction.Left);
          break;
        case "ArrowRight":
        case "d":
          props.game.panCamera(Direction.Right);
          break;
        case "-": {
          if (event.metaKey && props.state.zoom - 0.5 >= MIN_ZOOM) {
            props.dispatch({
              kind: UxActionKinds.SET_ZOOM,
              payload: (props.state.zoom -= 0.5),
            });
          }
          return;
        }
        case "=": {
          if (event.metaKey && props.state.zoom + 0.5 <= MAX_ZOOM) {
            props.dispatch({
              kind: UxActionKinds.SET_ZOOM,
              payload: (props.state.zoom += 0.5),
            });
          }
        }
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    props.game.currentScene.camera.zoom = props.state.zoom;
  }, [props.state.zoom]);

  useEffect(
    function handlePause() {
      if (props.state.paused) {
        props.game.stop();
      } else {
        props.game.start();
      }
    },
    [props.state.paused]
  );
  return (
    <div className="absolute right-4 bottom-4 flex items-center gap-2">
      <div className="flex flex-col items-center gap-2 ">
        <input
          type="range"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          title={props.state.zoom.toString()}
          value={props.state.zoom}
          className="range bg-purple-600"
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
    </div>
  );
};