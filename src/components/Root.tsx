import React, { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Game from "../classes/game";
import { Destination } from "../classes/destination";
import { Ship } from "../classes/ship";
import {
  ENGINE_DEFAULTS,
  NUMBER_OF_STARS,
  NUMBER_OF_SPACE_SHOPS,
  NUMBER_OF_SHIPS,
  NUMBER_OF_SPACE_HOMES,
} from "../consts";

import { makeStar } from "../utils/helpers";
import useUxState, { Action, ActionNames, State } from "../hooks/use-ux-state";
import { MeepleClass, MeepleKind } from "../classes/meeple";
import { Color } from "excalibur";
import Nav from "./Nav";
import useFilters from "../hooks/useFilters";

export type OutletContext = {
  game: Game;
  state: State;
  dispatch: React.Dispatch<Action>;
};

export async function rootLoader() {
  const game = new Game(ENGINE_DEFAULTS);

  for (let i = 0; i < NUMBER_OF_STARS; i++) {
    const star = makeStar(game);
    game.add(star);
  }

  for (let i = 0; i < NUMBER_OF_SPACE_SHOPS; i++) {
    const station = new Destination({
      kind: MeepleKind.SpaceShop,
    });
    game.add(station);
  }

  for (let i = 0; i < NUMBER_OF_SPACE_HOMES; i++) {
    const station = new Destination({
      kind: MeepleKind.Home,
      color: Color.Orange,
    });
    game.add(station);
  }

  for (let i = 0; i < NUMBER_OF_SHIPS; i++) {
    const ship = new Ship();
    game.add(ship);
  }

  await game.start();
  return { game };
}

const Root = () => {
  const navigate = useNavigate();
  const { filter } = useFilters();

  const { state, dispatch } = useUxState({
    actors: [],
    selectedActor: null,
    paused: false,
  });

  const { game } = useLoaderData() as {
    game: Game;
  };

  // Add click event to all actors for selection
  game.currentScene.actors.map((a) =>
    a.on("pointerdown", () => navigate(`/meeples/${a.id}?filter=${filter}`))
  );

  const location = useLocation();

  useEffect(
    function redirectToShipsFilter() {
      if (location.pathname === "/") {
        navigate(`/meeples/?filter=ships`);
      }
    },
    [location.pathname]
  );

  useEffect(
    function handlePause() {
      if (state.paused) {
        game.stop();
      } else {
        game.start();
      }
    },
    [state.paused]
  );

  useEffect(
    function syncGameWithState() {
      const interval = setInterval(() => {
        dispatch({
          name: ActionNames.SET_ACTORS,
          payload: [
            ...(game?.currentScene.actors
              .filter((a) => a instanceof MeepleClass)
              .map((a) => a as MeepleClass) ?? []),
          ],
        });
      }, 300);
      return () => clearInterval(interval);
    },
    [game]
  );

  return (
    <div className="h-full absolute">
      <Nav state={state} dispatch={dispatch} />
      <Outlet context={{ game, state, dispatch }} />
    </div>
  );
};
export default Root;
