import React from "react";
import StyledNavLink from "./StyledNavLink";
import Button from "./Button";
import useFilters from "../hooks/useFilters";
import { Action, UxActionKinds, UxState } from "../types";

const Nav = (props: { state: UxState; dispatch: React.Dispatch<Action> }) => {
  const { filter } = useFilters();
  return (
    <nav className="flex gap-2 p-4 items-center">
      <StyledNavLink
        to={{
          pathname: "/meeples",
          search: `?filter=${filter}`,
        }}
      >
        meeples
      </StyledNavLink>
      <StyledNavLink to="/help">help</StyledNavLink>
      {props.state.paused ? (
        <Button
          title="pause"
          onClick={() =>
            props.dispatch({
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
            props.dispatch({
              kind: UxActionKinds.PAUSE_GAME,
            })
          }
        >
          pause
        </Button>
      )}
    </nav>
  );
};

export default Nav;
