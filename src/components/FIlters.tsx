import React from "react";
import cx from "classnames";
import StyledNavLink from "./StyledNavLink";
import { ActorKind } from "../classes/ActorKind";
import useFilters from "../hooks/useFilters";
const Filters = () => {
  const { filter } = useFilters();

  return (
    <nav className="flex items-center gap-2 bg-black bg-opacity-50 px-4">
      <StyledNavLink
        to="/meeples"
        className={cx("hover:underline p-2", {
          "bg-purple-800 ": !filter,
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
