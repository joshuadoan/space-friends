import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Game from "../classes/game";
import { Destination } from "../classes/destination";
import { Ship } from "../classes/ship";
import { ENGINE_DEFAULTS } from "../consts";
import { makeStar } from "../utils/helpers";
import useUxState, { Action, ActionNames, State } from "../hooks/use-ux-state";
import { MeepleClass, MeepleKind } from "../classes/meeple";
import { Color } from "excalibur";
import Nav from "./Nav";

export type OutletContext = {
  game: Game;
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const NUMBER_OF_STARS = 256;
export const NUMBER_OF_SPACE_SHOPS = 5;
export const NUMBER_OF_SPACE_HOMES = 10;
export const NUMBER_OF_SHIPS = 42;

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
  const { state, dispatch } = useUxState({
    actors: [],
    selectedActor: null,
    paused: false,
  });

  const { game } = useLoaderData() as {
    game: Game;
  };

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
              .sort((a, b) => a.name.localeCompare(b.name))
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
