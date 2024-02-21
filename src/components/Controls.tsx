import React, { useEffect, useState } from "react";
import { Action, UxActionKinds, UxState } from "../types";
import { MAX_ZOOM, MIN_ZOOM } from "../classes/Meeple";
import Game from "../classes/Game";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const Controls = (props: {
  state: UxState;
  dispatch: React.Dispatch<Action>;
  game: Game;
}) => {
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
    </div>
  );
};
