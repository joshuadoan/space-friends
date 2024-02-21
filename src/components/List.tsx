import React, { useEffect } from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import { Action, UxState } from "../types";
import Game from "../classes/Game";
import { Badge } from "./Badge";
import useFilters from "../hooks/useFilters";
import Filters from "./FIlters";

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
    <>
      <Filters />
      <menu
        className="flex flex-col justify-start overflow-auto flex-1 p-4"
        role="menu"
      >
        {state.actors
          .filter((a) => (!!filter ? a.kind === filter : true))
          .map((actor) => (
            <li key={actor.id} data-testid="meeple" className="mb-4">
              <Badge meeple={actor} />
            </li>
          ))}
      </menu>
      <Outlet />
    </>
  );
};

export default List;
