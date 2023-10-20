import React, { useEffect } from "react";
import cx from "classnames";
import Blockies from "react-blockies";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import useUxState, { ActionNames, Filter } from "../hooks/use-ux-state";
import { filterActors } from "../utils/helpers";
import { Meeple } from "../classes/meeple";
import { Game } from "../classes/game";
import NavLink from "./NavLink";

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
      <nav className="sticky top-0 flex items-center gap-2 bg-black bg-opacity-50 p-2">
        Filters:
        <NavLink
          to="?filter=ships"
          className={cx("hover:underline p-2", {
            "bg-purple-800 ": params.get("filter") === "ships",
          })}
        >
          ships
        </NavLink>
        <NavLink
          to="?filter=destinations"
          className={cx("hover:underline p-2", {
            "bg-purple-800 ": params.get("filter") === "destinations",
          })}
        >
          destinations
        </NavLink>
      </nav>
      <menu
        className="p-2 flex flex-col justify-start overflow-auto h-full"
        role="menu"
      >
        {filterActors(
          [...(state.actors ?? [])],
          (params.get("filter") as Filter) ?? "ships"
        ).map((actor) => (
          <li
            key={actor.id}
            className={cx("", {
              "bg-purple-800 ": actor.id === selectedActor?.id,
            })}
          >
            <div className={cx("flex items-center gap-2 ")}>
              <NavLink
                to={`/meeples/${actor.id}`}
                title="Click to zoom and follow"
              >
                <span className="w-full text-left flex items-center gap-2">
                  <Blockies
                    seed={actor.owner.name}
                    size={10}
                    scale={3}
                    color={actor.color.toHex()}
                    bgColor="#000"
                  />
                  {actor.owner.name}
                </span>
              </NavLink>
              <span>{actor.getState()}</span>
            </div>
            <div className="flex gap-2 p-2">
              <span>x: {Math.round(actor.pos.x)}</span>
              <span>y:{Math.round(actor.pos.y)}</span>
            </div>
            <div className="flex gap-2 p-2">
              {Object.values(actor.getGuests()).map((a) => a.owner.name)}
            </div>
          </li>
        ))}
      </menu>
    </>
  );
};

export default Meeples;
