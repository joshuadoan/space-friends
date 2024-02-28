import React from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import { Action, UxState } from "../types";
import { Badge } from "../components/Badge";
import useFilters from "../hooks/useFilters";
import Filters from "../components/Filters";

const List = () => {
  const { actorKind: actor } = useFilters();
  const { state } = useOutletContext() as {
    state: UxState;
    dispatch: React.Dispatch<Action>;
  };


  return (
    <>
      <Filters />
      <menu
        className="flex flex-col justify-start overflow-auto flex-1 p-4"
        role="menu"
        data-test-id="menu"
      >
        {state.actors
          .filter((a) => (!!actor ? a.kind === actor : true))
          .map((actor) => (
            <li key={actor.id} data-testid="actor" className="mb-4">
              <Badge meeple={actor} />
            </li>
          ))}
      </menu>
      <Outlet />
    </>
  );
};

export default List;
