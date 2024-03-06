import React from "react";
import cx from "classnames";
import { useParams } from "react-router-dom";
import StyledNavLink from "./StyledNavLink";
import { ActorKind } from "../classes/ActorKind";
import useFilters, { FilterKinds } from "../hooks/useFilters";
export const Filters = () => {
  const { actorKind: actorKindFromParams } = useFilters();
  let { meepleId } = useParams<{
    meepleId: string;
  }>();

  return (
    <div
      className={cx("flex items-center gap-2 bg-black bg-opacity-50 px-4", {
        hidden: !!meepleId,
      })}
      data-testid="filters"
    >
      <StyledNavLink
        to="/"

        className={cx("hover:underline p-2", {
          "bg-purple-800 ": !actorKindFromParams,
          "opacity-50": !!meepleId,
        })}
      >
        all
      </StyledNavLink>
      {
        (Object.values(ActorKind) as Array<ActorKind>).filter(f => {
          return f !== ActorKind.Star;
        }).map((key, i) => {
          return <StyledNavLink
            key={i}
            to={`?${FilterKinds.Actor}=${key}`}
            className={cx("hover:underline p-2", {
              "bg-purple-800 ": actorKindFromParams === key,
            })}
          >
            {key}
          </StyledNavLink>
        })
      }
    </div>
  );
};
