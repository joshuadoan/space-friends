import React from "react";
import cx from "classnames";
import Blockies from "react-blockies";
import {
  useOutletContext,
  useParams,
  useSearchParams,
  Outlet,
} from "react-router-dom";
import { Action, Filter, State } from "../hooks/use-ux-state";
import { filterActors } from "../utils/helpers";
import Game from "../classes/game";
import StyledNavLink from "./StyledNavLink";
import { Ship } from "../classes/ship";
import { Destination } from "../classes/destination";

const Meeples = () => {
  const [params] = useSearchParams();
  const { state } = useOutletContext() as {
    game: Game;
    state: State;
    dispatch: React.Dispatch<Action>;
  };

  let { meepleId } = useParams<{
    meepleId: string;
  }>();

  const selectedActor = state.actors.find((a) => a.id === Number(meepleId));
  const filter = params.get("filter") as Filter;

  return (
    <>
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
        className="flex flex-col justify-start overflow-auto h-full p-4"
        role="menu"
      >
        {filterActors([...state.actors], params.get("filter") as Filter).map(
          (actor) => (
            <li
              key={actor.id}
              className={cx("p-2", {
                "bg-purple-800 ": actor.id === selectedActor?.id,
              })}
              data-testid="meeple"
            >
              <div className={cx("flex items-center gap-2")}>
                <StyledNavLink
                  to={`/meeples/${actor.id}?filter=${params.get("filter")}`}
                  title="Click to zoom and follow"
                >
                  <span className="w-full text-left flex items-center gap-2">
                    <Blockies
                      seed={actor.name}
                      size={8}
                      scale={3}
                      color={actor.color.toHex()}
                      bgColor="#000"
                    />
                    {actor.name}
                  </span>
                </StyledNavLink>
              </div>
              <div className="px-2">
                <div className="flex gap-2">
                  <label className="opacity-70">state:</label>
                  <span>{actor.getState()}</span>
                </div>
                <div className="flex gap-2">
                  <label className="opacity-70">type:</label>
                  {actor instanceof Ship && <span>ship</span>}
                  {actor instanceof Destination && <span>destination</span>}
                </div>
                <div className="flex gap-2">
                  <label className="opacity-70">position:</label>
                  <span>x: {Math.round(actor.pos.x)}</span>
                  <span>y:{Math.round(actor.pos.y)}</span>
                </div>
              </div>
            </li>
          )
        )}
      </menu>
      <Outlet />
    </>
  );
};

export default Meeples;
