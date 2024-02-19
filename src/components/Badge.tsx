import React from "react";
import { useSearchParams } from "react-router-dom";
import Avatar from "./Avatar";
import StyledLink from "./StyledLink";
import { Meeple } from "../classes/Meeple";

export const Badge = (props: { meeple: Meeple }) => {
  const [params] = useSearchParams();
  const { imgUrl, health, stuff, journal } = props.meeple.status;
  const event = journal[journal.length - 1];
  return (
    <div>
      <div className={"flex items-center gap-2"}>
        <StyledLink
          to={`/meeples/${props.meeple.id}?filter=${params.get("filter")}`}
          title="Click to zoom and follow"
        >
          <div className="w-full text-left flex items-center gap-2">
            <Avatar url={imgUrl} />
            <div className="flex flex-col">
              {props.meeple.name}
              <span className="opacity-70 flex items-center gap-2">
                {props.meeple.kind}
                <div
                  className="w-2 h-2"
                  style={{
                    backgroundColor: props.meeple.color.toString(),
                  }}
                />
              </span>
            </div>
          </div>
        </StyledLink>
      </div>
      <dl className={"px-2"}>
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
    </div>
  );
};
