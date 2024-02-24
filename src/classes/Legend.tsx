import React from "react";
import { MEEPLE_COLOR } from "./Base";
import { UxState } from "../types";

export const Legend = (props: { state: UxState }) => {
  return (
    <ul className="flex items-center gap-2">
      {Object.entries(MEEPLE_COLOR).map(([name, color]) => (
        <li key={name} className="rounded-md flex items-center gap-2">
          <div
            className="w-2 h-2"
            style={{
              backgroundColor: color.toString(),
            }}
          />
          <span>
            {props.state.actors.reduce((acc, meeple) => {
              if (meeple.kind === name) {
                return acc + 1;
              }
              return acc;
            }, 0)}
          </span>
        </li>
      ))}
    </ul>
  );
};
