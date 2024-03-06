import React from "react";
import { ActorBase } from "../classes/Base";

export const ActorDetails = (props: { meeple: ActorBase }) => {
  const { health, stuff, journal } = props.meeple.status;
  const event = journal[journal.length - 1];
  return (
    <dl className={"px-2  "}>
      <dd className="flex gap-2 items-center">
        <label className="opacity-70">state: </label> {event?.state}
      </dd>
      <dd className="flex gap-2 items-center">
        <label className="opacity-70">status: </label>♡ {health} &#65504;{" "}
        {stuff}
      </dd>
      <dd className="flex gap-2 items-center">
        <label className="opacity-70">position:</label>
        <span>x: {Math.round(props.meeple.pos.x)}</span>
        <span>y:{Math.round(props.meeple.pos.y)}</span>
      </dd>
    </dl>

  );
};
