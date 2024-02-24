import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Game from "../classes/Game";
import { makeStar } from "../utils/helpers";
import useUxState from "../hooks/use-ux-state";
import { UxActionKinds } from "../types";
import { DEFAULT_ZOOM, ActorBase } from "../classes/Base";
import { SpaceShop } from "../classes/SpaceShop";
import { Home } from "../classes/Home";
import { Laborer } from "../classes/Laborer";
import { Pirate } from "../classes/Pirate";
import { PirateBase } from "../classes/PirateBase";
import { Color, DisplayMode } from "excalibur";
import { Legend } from "../classes/Legend";
import { Controls } from "../components/Controls";
import StyledNavLink from "../components/StyledNavLink";

export const NUMBER_OF_STARS = 100;
export const NUMBER_OF_SPACE_SHOPS = 5;
export const NUMBER_OF_SPACE_HOMES = 3;
export const NUMBER_OF_SHIPS = 27;
export const NUMBER_OF_PIRATES = 5;
export const NUMBER_OF_PIRATE_BASES = 1;

export async function rootLoader() {
  const game = new Game({
    displayMode: DisplayMode.FitScreenAndFill,
    backgroundColor: Color.Black,
    canvasElementId: "canvas",
    antialiasing: false,
  });

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

  for (let i = 0; i < NUMBER_OF_PIRATE_BASES; i++) {
    const ship = new PirateBase();
    game.add(ship);
  }

  await game.start();
  return { game };
}

const Root = () => {
  const { state, dispatch } = useUxState({
    actors: [],
    paused: false,
    zoom: DEFAULT_ZOOM,
  });

  const { game } = useLoaderData() as {
    game: Game;
  };

  useEffect(
    function syncGameWithState() {
      const interval = setInterval(() => {
        dispatch({
          kind: UxActionKinds.SET_ACTORS,
          payload: [
            ...(game?.currentScene.actors
              .filter((a) => a instanceof ActorBase)
              .map((a) => a as ActorBase) ?? []),
          ],
        });
        dispatch({
          kind: UxActionKinds.SET_ZOOM,
          payload: game?.currentScene.camera.zoom,
        });
      }, 300);
      return () => clearInterval(interval);
    },
    [game]
  );

  return (
    <>
      <div className="h-full flex flex-col absolute ">
        <nav className="flex gap-2 p-4 items-center">
          <StyledNavLink
            to={{
              pathname: "/",
            }}
          >
            home
          </StyledNavLink>
          <StyledNavLink to="/help">help</StyledNavLink>
        </nav>
        <Outlet context={{ state, dispatch }} />
      </div>
      <Legend state={state} />
      <Controls state={state} dispatch={dispatch} game={game} />
    </>
  );
};
export default Root;
