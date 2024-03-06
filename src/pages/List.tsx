import React from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import { UxState } from "../types";
import { ActorDetails } from "../components/ActorDetails";
import Filters from "../components/Filters";

const List = () => {
  const { state } = useOutletContext() as {
    state: UxState;
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
          .map((actor) => (
            actor.kind && <li key={actor.id} data-testid="actor" className="mb-4">
              <ActorDetails meeple={actor} />
            </li>
          ))}
      </menu>
      <Outlet />
    </>
  );
};

export default List;
