import React from "react";
import { MEEPLE_COLOR } from "./Base";
import { UxState } from "../types";

export const Legend = (props: { state: UxState }) => {
  return (
    <ul className="flex flex-col  max-w-32 absolute right-4 top-4">
      {Object.entries(MEEPLE_COLOR).map(([name, color]) => (
        <li key={name} className="rounded-md flex items-center gap-2">
          <div
            className="w-2 h-2"
            style={{
              backgroundColor: color.toString(),
            }}
          />
          {name}
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
