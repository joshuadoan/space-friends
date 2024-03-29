import { useEffect } from "react";
import Game from "../classes/Game";
import { UxAction, Direction, UxActionKinds, UxState } from "../types";
import { MAX_ZOOM, MIN_ZOOM } from "../classes/Base";

enum MyKeys {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  "w" = "w",
  "a" = "a",
  "s" = "s",
  "d" = "d",
  "-" = "-",
  "=" = "=",
}
export default function useControls(
  game: Game,
  state: UxState,
  dispatch: React.Dispatch<UxAction>
) {
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (!MyKeys[event.key as keyof typeof MyKeys]) {
        return;
      }
      event.preventDefault();
      switch (event.key) {
        case "ArrowUp":
        case "w":
          game.panCamera(Direction.Up);
          break;
        case "ArrowDown":
        case "s":
          game.panCamera(Direction.Down);
          break;
        case "ArrowLeft":
        case "a":
          game.panCamera(Direction.Left);
          break;
        case "ArrowRight":
        case "d":
          game.panCamera(Direction.Right);
          break;
        case "-": {
          if (event.metaKey && state.zoom - 0.5 >= MIN_ZOOM) {
            dispatch({
              kind: UxActionKinds.SET_ZOOM,
              payload: (state.zoom -= 0.5),
            });
          }
          return;
        }
        case "=": {
          if (event.metaKey && state.zoom + 0.5 <= MAX_ZOOM) {
            dispatch({
              kind: UxActionKinds.SET_ZOOM,
              payload: (state.zoom += 0.5),
            });
          }
        }
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    game.currentScene.camera.zoom = state.zoom;
  }, [state.zoom]);

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
    function handleSelected() {
      game.zoomOut();
    },
    [game]
  );
}
