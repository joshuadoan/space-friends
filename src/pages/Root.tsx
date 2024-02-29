import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Game from "../classes/Game";
import useUxState from "../hooks/use-ux-state";
import { Direction, UxActionKinds } from "../types";
import { DEFAULT_ZOOM, ActorBase } from "../classes/Base";
import { Footer } from "../components/Footer";
import StyledNavLink from "../components/StyledNavLink";
import useControls from "../hooks/use-controls";
import { ActorKind } from "../classes/ActorKind";

export async function rootLoader() {
  const game = new Game();

  await game.start();
  return { game };
}

const Root = () => {
  const { state, dispatch } = useUxState({
    actors: [],
    paused: false,
    zoom: DEFAULT_ZOOM,
    cameraDirection: Direction.Left,
  });

  const { game } = useLoaderData() as {
    game: Game;
  };

  useControls(game, state, dispatch);

  useEffect(
    function syncGameWithState() {
      const interval = setInterval(() => {
        dispatch({
          kind: UxActionKinds.SET_ACTORS,
          payload: [
            ...(game?.currentScene.actors
              .filter((a) => a instanceof ActorBase && a.kind !== ActorKind.Star)
              .map((a) => a as ActorBase) ?? []),
          ],
        });

      }, 300);
      return () => clearInterval(interval);
    },
    [game]
  );

  return (
    <div className="h-full flex flex-col absolute w-full"  >
      <nav className="flex gap-2 p-4 items-center"  >
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
      <Footer state={state} dispatch={dispatch} game={game} />
    </div>
  );
};
export default Root;
