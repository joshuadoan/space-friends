import React, { useEffect } from "react";
import cx from "classnames";
import { useOutletContext, Outlet } from "react-router-dom";
import { Action, UxState } from "../types";
import { filterActors } from "../utils/helpers";
import Game from "../classes/game";
import StyledNavLink from "./StyledNavLink";
import { Meeple } from "./Meeple";
import useFilters from "../hooks/useFilters";

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
          to="?filter=ships"
          className={cx("hover:underline p-2", {
            "bg-purple-800 ": filter === "ships",
          })}
        >
          ships
        </StyledNavLink>
        <StyledNavLink
          to="?filter=destinations"
          className={cx("hover:underline p-2", {
            "bg-purple-800 ": filter === "destinations",
          })}
        >
          destinations
        </StyledNavLink>
      </nav>
      <menu
        className="flex flex-col justify-start overflow-auto flex-1 p-4"
        role="menu"
      >
        {filterActors([...state.actors], filter).map((actor) => (
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
