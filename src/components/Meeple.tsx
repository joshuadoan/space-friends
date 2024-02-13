import React from "react";
import { MeepleClass } from "../classes/meeple";
import { useSearchParams } from "react-router-dom";
import Avatar from "./Avatar";
import StyledLink from "./StyledLink";

export const Meeple = (props: { meeple: MeepleClass }) => {
  const [params] = useSearchParams();
  return (
    <div>
      <div className={"flex items-center gap-2"}>
        <StyledLink
          to={`/meeples/${props.meeple.id}?filter=${params.get("filter")}`}
          title="Click to zoom and follow"
        >
          <div className="w-full text-left flex items-center gap-2">
            <Avatar url={props.meeple.getAvatar()} />
            <div className="flex flex-col">
              {props.meeple.name}
              {props.meeple.tags.map((tag, i) => (
                <span key={i} className="opacity-70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </StyledLink>
      </div>
      <dl className={"px-2"}>
        <dd className="flex gap-2 items-center">
          <label className="opacity-70">state:</label>
          <span>{props.meeple.getState()}</span>
        </dd>
        <dd className="flex gap-2 items-center">
          <label className="opacity-70">status: </label>♡{" "}
          {props.meeple.getStatus().health} &#65504;{" "}
          {props.meeple.getStatus().stuff}
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
