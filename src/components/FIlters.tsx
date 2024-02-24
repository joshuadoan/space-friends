import React from "react";
import cx from "classnames";
import { useParams } from "react-router-dom";
import StyledNavLink from "./StyledNavLink";
import { ActorKind } from "../classes/ActorKind";
import useFilters, { FilterKinds } from "../hooks/useFilters";
const Filters = () => {
  const { actorKind } = useFilters();
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
          "bg-purple-800 ": !actorKind,
          "opacity-50": !!meepleId,
        })}
      >
        all
      </StyledNavLink>
      {
        (Object.keys(ActorKind) as Array<keyof typeof ActorKind>).map((key, i) => {
          return <StyledNavLink
            key={i}
            to={`?${FilterKinds.Actor}=${ActorKind[key]}`}
            className={cx("hover:underline p-2", {
              "bg-purple-800 ": actorKind === ActorKind[key],
            })}
          >
            {ActorKind[key]}
          </StyledNavLink>
        })
      }
    </div>
  );
};

export default Filters;
