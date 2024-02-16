import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Game from "../classes/game";
import { ENGINE_DEFAULTS } from "../consts";
import { makeStar } from "../utils/helpers";
import useUxState from "../hooks/use-ux-state";
import Nav from "./Nav";
import { UxActionKinds } from "../types";
import { Base, Home, SpaceShop } from "../classes/base";
import { Laborer } from "../classes/Laborer";
import { Pirate } from "../classes/Pirate";

export const NUMBER_OF_STARS = 100;
export const NUMBER_OF_SPACE_SHOPS = 5;
export const NUMBER_OF_SPACE_HOMES = 3;
export const NUMBER_OF_SHIPS = 27;
export const NUMBER_OF_PIRATES = 10;

export async function rootLoader() {
  const game = new Game(ENGINE_DEFAULTS);

  for (let i = 0; i < NUMBER_OF_STARS; i++) {
    const star = makeStar(game);
    game.add(star);
  }

  for (let i = 0; i < NUMBER_OF_SPACE_HOMES; i++) {
    const ship = new Home();
    game.add(ship);
  }

  for (let i = 0; i < NUMBER_OF_SPACE_SHOPS; i++) {
    const ship = new SpaceShop();
    game.add(ship);
  }

  for (let i = 0; i < NUMBER_OF_SHIPS; i++) {
    const ship = new Laborer();
    game.add(ship);
  }

  for (let i = 0; i < NUMBER_OF_PIRATES; i++) {
    const ship = new Pirate();
    game.add(ship);
  }

  await game.start();
  return { game };
}

const Root = () => {
  const { state, dispatch } = useUxState({
    actors: [],
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
          kind: UxActionKinds.SET_ACTORS,
          payload: [
            ...(game?.currentScene.actors
              .filter((a) => a instanceof Base)
              .map((a) => a as Base) ?? []),
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
