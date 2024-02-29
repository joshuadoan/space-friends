import React, { useEffect } from "react";
import Button from "./Button";
import { Direction, UxAction, UxActionKinds, UxState } from "../types";
import Game from "../classes/Game";

export const CameraControls = (props: {
  state: UxState;
  dispatch: React.Dispatch<UxAction>;
  game: Game;
}) => {
  const [mouseDown, setMouseDown] = React.useState(false);

  useEffect(() => {
    window.addEventListener("mousedown", () => setMouseDown(true));
    window.addEventListener("mouseup", () => {
      setMouseDown(false)
      props.dispatch({
        kind: UxActionKinds.SET_CAMERA_DIRECTION,
        payload: null
      })
    });
    return () => {
      window.removeEventListener("mousedown", () => () => setMouseDown(true));
      window.removeEventListener("mouseup", () => setMouseDown(false));
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!mouseDown) {
        return;
      }

      if (props.state.cameraDirection === null) {
        return;
      }

      switch (props.state.cameraDirection) {
        case Direction.Up:
          props.game.panCamera(Direction.Up);
          break;
        case Direction.Down:
          props.game.panCamera(Direction.Down);
          break;
        case Direction.Left:
          props.game.panCamera(Direction.Left);
          break;
        case Direction.Right:
          props.game.panCamera(Direction.Right);
          break;
      }
    }, 1000 / 30);


    return () => clearInterval(interval);

  }, [mouseDown])


  return <div className="flex flex-col justify-center gap-1 text-xs">
    <Button className="self-center" onMouseDown={() => {
      props.dispatch({
        kind: UxActionKinds.SET_CAMERA_DIRECTION,
        payload: Direction.Up,
      });
    }}>&#8593;</Button>
    <div className="flex gap-1">
      <Button onMouseDown={() => {
        props.dispatch({
          kind: UxActionKinds.SET_CAMERA_DIRECTION,
          payload: Direction.Left,
        });
      }}>&#8592;</Button>
      <Button onMouseDown={() => {
        props.dispatch({
          kind: UxActionKinds.SET_CAMERA_DIRECTION,
          payload: Direction.Right,
        })
      }}>&#8594;</Button>
    </div>
    <Button onMouseDown={() => {
      props.dispatch({
        kind: UxActionKinds.SET_CAMERA_DIRECTION,
        payload: Direction.Down,
      })
    }} className="self-center">&#8595;</Button>
  </div>;
};
