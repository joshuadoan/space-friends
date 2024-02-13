import React from "react";
import cx from "classnames";
import { useOutletContext, useSearchParams, Outlet } from "react-router-dom";
import { Action, Filter, State } from "../hooks/use-ux-state";
import { filterActors } from "../utils/helpers";
import Game from "../classes/game";
import StyledNavLink from "./StyledNavLink";
import { Meeple } from "./Meeple";

const List = () => {
  const [params] = useSearchParams();
  const { state } = useOutletContext() as {
    game: Game;
    state: State;
    dispatch: React.Dispatch<Action>;
  };

  const filter = params.get("filter") as Filter;

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
        {filterActors([...state.actors], params.get("filter") as Filter).map(
          (actor) => (
            <li key={actor.id} data-testid="meeple">
              <Meeple meeple={actor} />
            </li>
          )
        )}
      </menu>
      <Outlet />
    </div>
  );
};

export default List;
