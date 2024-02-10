import React, { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Game from "../classes/game";
import Button from "./Button";
import StyledNavLink from "./StyledNavLink";
import { Destination } from "../classes/destination";
import { Ship } from "../classes/ship";
import {
  ENGINE_DEFAULTS,
  NUMBER_OF_STARS,
  NUMBER_OF_SPACE_SHOPS,
  NUMBER_OF_SHIPS,
  NUMBER_OF_SPACE_HOMES,
} from "../consts";

import { makeStar } from "../utils/helpers";
import useUxState, {
  Action,
  ActionNames,
  Filter,
  State,
} from "../hooks/use-ux-state";
import { Meeple, MeepleKind } from "../classes/meeple";

export type OutletContext = {
  game: Game;
  state: State;
  dispatch: React.Dispatch<Action>;
};

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
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const filter = params.get("filter") as Filter;

  const { state, dispatch } = useUxState({
    actors: [],
    selectedActor: null,
  });

  const { game } = useLoaderData() as {
    game: Game;
  };

  // Add click event to all actors for selection
  game.currentScene.actors.map((a) =>
    a.on("pointerdown", () => navigate(`/meeples/${a.id}?filter=${filter}`))
  );

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(`/meeples/?filter=ships`);
    }
  }, [location.pathname]);

  useEffect(
    function syncGameWithState() {
      const interval = setInterval(() => {
        dispatch({
          name: ActionNames.SET_ACTORS,
          payload: [
            ...(game?.currentScene.actors
              .filter((a) => a instanceof Meeple)
              .map((a) => a as Meeple) ?? []),
          ],
        });
      }, 300);
      return () => clearInterval(interval);
    },
    [game]
  );

  return (
    <>
      <div className="h-full absolute">
        <nav className="flex gap-2 bg-black bg-opacity-50 p-4">
          <StyledNavLink
            to={{
              pathname: "/meeples",
              search: `?filter=${filter}`,
            }}
          >
            meeples
          </StyledNavLink>
          <StyledNavLink to="/help">help</StyledNavLink>
          <Button onClick={() => game?.resetZoom()}>reset zoom</Button>
        </nav>
        <Outlet context={{ game, state, dispatch }} />
      </div>
    </>
  );
};
export default Root;
