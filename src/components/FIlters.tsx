import React from "react";
import cx from "classnames";
import { useParams } from "react-router-dom";
import StyledNavLink from "./StyledNavLink";
import { ActorKind } from "../classes/ActorKind";
import useFilters from "../hooks/useFilters";
const Filters = () => {
  const { filter } = useFilters();
  let { meepleId } = useParams<{
    meepleId: string;
  }>();

  return (
    <nav
      className={cx("flex items-center gap-2 bg-black bg-opacity-50 px-4", {
        hidden: !!meepleId,
      })}
    >
      <StyledNavLink
        to="/meeples"
        className={cx("hover:underline p-2", {
          "bg-purple-800 ": !filter,
          "opacity-50": !!meepleId,
        })}
      >
        all
      </StyledNavLink>
      <StyledNavLink
        to={`?filter=${ActorKind.Laborer}`}
        className={cx("hover:underline p-2", {
          "bg-purple-800 ": filter === ActorKind.Laborer,
        })}
      >
        ships
      </StyledNavLink>
      <StyledNavLink
        to={`?filter=${ActorKind.Pirate}`}
        className={cx("hover:underline p-2", {
          "bg-purple-800 ": filter === ActorKind.Pirate,
        })}
      >
        pirates
      </StyledNavLink>
      <StyledNavLink
        to={`?filter=${ActorKind.SpaceShop}`}
        className={cx("hover:underline p-2", {
          "bg-purple-800 ": filter === ActorKind.SpaceShop,
        })}
      >
        space shops
      </StyledNavLink>
      <StyledNavLink
        to={`?filter=${ActorKind.Home}`}
        className={cx("hover:underline p-2", {
          "bg-purple-800 ": filter === ActorKind.Home,
        })}
      >
        homes
      </StyledNavLink>
    </nav>
  );
};

export default Filters;
