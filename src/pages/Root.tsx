import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Game from "../classes/Game";
import useUxState from "../hooks/use-ux-state";
import { Direction, UxActionKinds } from "../types";
import { DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM } from "../classes/Base";
import StyledNavLink from "../components/StyledNavLink";
import useControls from "../hooks/use-controls";
import Button from "../components/Button";
import { CameraControls } from "../components/CameraControls";
import { Slider } from "../components/Slider";

export async function rootLoader() {
  const game = new Game();

  await game.start();
  return { game };
}

const Root = () => {
  const { game } = useLoaderData() as {
    game: Game;
  };

  const { state, dispatch } = useUxState({
    actors: game.actors,
    paused: false,
    zoom: DEFAULT_ZOOM,
    cameraDirection: Direction.Left,
  });

  useControls(game, state, dispatch);

  useEffect(
    function syncGameWithState() {
      const interval = setInterval(() => {
        dispatch({
          kind: UxActionKinds.SET_ACTORS,
          payload: game.actors,
        });

        dispatch({
          kind: UxActionKinds.SET_ZOOM,
          payload: game.currentScene.camera.zoom,
        })

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
            pathname: "/actors",
          }}
        >
          home
        </StyledNavLink>
        <StyledNavLink to="/help">help</StyledNavLink>
      </nav>
      <Outlet context={{ state, dispatch }} />
      <footer className="items-center gap-4 justify-end p-4 md:absolute right-0 bottom-0 size hidden md:flex ">
        <CameraControls state={state} dispatch={dispatch} game={game} />
        <Button
          title="play"
          onClick={() =>
            dispatch({
              kind: state.paused
                ? UxActionKinds.RESUME_GAME
                : UxActionKinds.PAUSE_GAME,
            })
          }
        >
          {state.paused ? "play" : "pause"}
        </Button>
        <Slider min={MIN_ZOOM} max={MAX_ZOOM} value={state.zoom}
          disabled={!!state.paused}
          onChange={function (value: number) {
            dispatch({
              kind: UxActionKinds.SET_ZOOM,
              payload: value,
            });
          }} />
      </footer>
    </div>
  );
};

export default Root;
