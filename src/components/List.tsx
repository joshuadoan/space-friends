import React, { useEffect } from "react";
import cx from "classnames";
import { useOutletContext, Outlet } from "react-router-dom";
import { Action, UxState } from "../types";
import Game from "../classes/game";
import StyledNavLink from "./StyledNavLink";
import { Meeple } from "./Meeple";
import useFilters from "../hooks/useFilters";
import { ActorKind } from "../classes/base";

const List = () => {
  const { filter } = useFilters();
  const { state, game } = useOutletContext() as {
    game: Game;
    state: UxState;
    dispatch: React.Dispatch<Action>;
  };

  useEffect(
    function handleSelected() {
      game.resetZoom();
    },
    [game]
  );

  return (
    <div className="flex flex-col h-full">
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
      <menu
        className="flex flex-col justify-start overflow-auto flex-1 p-4"
        role="menu"
      >
        {state.actors
          .filter((a) => (!!filter ? a.kind === filter : true))
          .map((actor) => (
            <li key={actor.id} data-testid="meeple" className="mb-4">
              <Meeple meeple={actor} />
            </li>
          ))}
      </menu>
      <Outlet />
    </div>
  );
};

export default List;
