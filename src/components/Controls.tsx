import React, { useEffect } from "react";
import { Action, UxActionKinds, UxState } from "../types";
import { MAX_ZOOM, MIN_ZOOM } from "../classes/Meeple";
import Game from "../classes/Game";
import { vec } from "excalibur";

export const Controls = (props: {
  state: UxState;
  dispatch: React.Dispatch<Action>;
  game: Game;
}) => {
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      event.preventDefault();
      const { camera } = props.game.currentScene;
      switch (event.key) {
        case "ArrowUp":
        case "w":
          camera.move(vec(camera.pos.x, camera.pos.y - 20), 100);
          break;
        case "ArrowDown":
        case "s":
          camera.move(vec(camera.pos.x, camera.pos.y + 20), 100);
          break;
        case "ArrowLeft":
        case "a":
          camera.move(vec(camera.pos.x - 20, camera.pos.y), 100);
          break;
        case "ArrowRight":
        case "d":
          camera.move(vec(camera.pos.x + 20, camera.pos.y), 100);
          break;
        case "":
          break;
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
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
