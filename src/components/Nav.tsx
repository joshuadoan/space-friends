import React from "react";
import StyledNavLink from "./StyledNavLink";
import { useSearchParams } from "react-router-dom";
import { Filter } from "../hooks/use-ux-state";
import Button from "./Button";
import Game from "../classes/game";

const Nav = (props: { game: Game }) => {
  const [params] = useSearchParams();
  const filter = params.get("filter") as Filter;
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
      <Button onClick={() => props.game.resetZoom()}>reset zoom</Button>
      {props.game.isRunning() ? (
        <Button title="play" onClick={() => props.game.stop()}>
          pause
        </Button>
      ) : (
        <Button title="pause" onClick={() => props.game.start()}>
          play
        </Button>
      )}
    </nav>
  );
};

export default Nav;
