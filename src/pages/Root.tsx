import React, { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Game from "../classes/Game";
import useUxState from "../hooks/use-ux-state";
import { Direction, UxActionKinds } from "../types";
import { DEFAULT_ZOOM, ActorBase, MIN_ZOOM, MAX_ZOOM } from "../classes/Base";
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
              .map((a) => a as ActorBase) ?? []),
          ],
        });

        dispatch({
          kind: UxActionKinds.SET_ZOOM,
          payload: game.currentScene.camera.zoom,
        })

      }, 500);
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
      <footer className="flex items-center gap-4 justify-end p-4 md:absolute right-0 bottom-0 size ">
        <CameraControls state={state} dispatch={dispatch} game={game} />
        {state.paused ? (
          <Button
            title="pause"
            onClick={() =>
              dispatch({
                kind: UxActionKinds.RESUME_GAME,
              })
            }
          >
            play
          </Button>
        ) : (
          <Button
            title="play"
            onClick={() =>
              dispatch({
                kind: UxActionKinds.PAUSE_GAME,
              })
            }
          >
            pause
          </Button>
        )}
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
