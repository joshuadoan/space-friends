import React from "react";
import { MEEPLE_COLOR } from "./Meeple";

export const Legend = () => {
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
        </li>
      ))}
    </ul>
  );
};
