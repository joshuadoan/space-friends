import React from "react";
import { ActorBase } from "../classes/Base";

export const ActorDetails = (props: { meeple: ActorBase }) => {
  const { health, stuff, journal } = props.meeple.status;
  const event = journal[journal.length - 1];
  return (
    <dl className="py-2">
      <dt className="font-semibold">Status</dt>
      <dd className="flex gap-2 items-center">
        <label className="opacity-70">state: </label> {event?.state}
      </dd>
      <dd className="flex gap-2 items-center">
        <label className="opacity-70">vitals: </label>♡ {health} &#65504;{" "}
        {stuff}
      </dd>
    </dl>
  );
};
