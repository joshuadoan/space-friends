import React, { useEffect } from "react";
import cx from "classnames";
import Blockies from "react-blockies";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import useUxState, { ActionNames, Filter } from "../hooks/use-ux-state";
import { filterActors } from "../utils/helpers";
import { Meeple } from "../classes/meeple";
import Game from "../classes/game";
import NavLink from "./NavLink";
import { Ship } from "../classes/ship";
import { Destination } from "../classes/destination";

const Meeples = () => {
  const [params] = useSearchParams();
  const { game } = useOutletContext() as {
    game: Game;
  };

  const { state, dispatch } = useUxState({
    actors: [],
    selectedActor: null,
  });

  let { meepleId } = useParams<{
    meepleId: string;
  }>();

  const selectedActor = state.actors.find((a) => a.id === Number(meepleId));
  const filter = params.get("filter") as Filter;

  useEffect(
    function syncGameWithState() {
      const interval = setInterval(() => {
        dispatch({
          name: ActionNames.SET_ACTORS,
          payload: [
            ...(game?.currentScene.actors
              .filter((a) => a instanceof Meeple)
              .map((a) => a as Meeple) ?? []),
          ],
        });
      }, 300);
      return () => clearInterval(interval);
    },
    [game]
  );

  useEffect(
    function handleSelected() {
      if (selectedActor) {
        selectedActor.zoomTo();
      }
    },
    [selectedActor]
  );

  return (
    <>
      <nav className="flex items-center gap-2 bg-black bg-opacity-50 px-4">
        <NavLink
          to="/meeples"
          className={cx("hover:underline p-2", {
            "bg-purple-800 ": !filter,
          })}
        >
          all
        </NavLink>
        <NavLink
          to="?filter=ships"
          className={cx("hover:underline p-2", {
            "bg-purple-800 ": filter === "ships",
          })}
        >
          ships
        </NavLink>
        <NavLink
          to="?filter=destinations"
          className={cx("hover:underline p-2", {
            "bg-purple-800 ": filter === "destinations",
          })}
        >
          destinations
        </NavLink>
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
            >
              <div className={cx("flex items-center gap-2")}>
                <NavLink
                  to={`/meeples/${actor.id}?filter=${params.get("filter")}`}
                  title="Click to zoom and follow"
                >
                  <span className="w-full text-left flex items-center gap-2">
                    <Blockies
                      seed={actor.owner.name}
                      size={8}
                      scale={3}
                      color={actor.color.toHex()}
                      bgColor="#000"
                    />
                    {actor.owner.name}
                  </span>
                </NavLink>
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
                {/* <details>
                  <summary>more details</summary>
                  <div>more details here.</div>
                </details> */}
              </div>
            </li>
          )
        )}
      </menu>
    </>
  );
};

export default Meeples;
