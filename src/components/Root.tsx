import React from "react";
import {
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Game from "../classes/game";
import Button from "./Button";
import NavLink from "./NavLink";
import { Destination } from "../classes/destination";
import { Ship } from "../classes/ship";
import {
  ENGINE_DEFAULTS,
  NUMBER_OF_STARS,
  NUMBER_OF_STATIONS,
  NUMBER_OF_SHIPS,
} from "../consts";

import { makeStar } from "../utils/helpers";

export async function rootLoader() {
  const game = new Game(ENGINE_DEFAULTS);

  for (let i = 0; i < NUMBER_OF_STARS; i++) {
    const star = makeStar(game);
    game.add(star);
  }

  for (let i = 0; i < NUMBER_OF_STATIONS; i++) {
    const station = new Destination();
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

  const { game } = useLoaderData() as {
    game: Game;
  };

  // Add click event to all actors for selection
  game.currentScene.actors.map((a) =>
    a.on("pointerdown", () => navigate(`/meeples/${a.id}?filter=`))
  );

  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to="/meeples/?filter=ships" />;
  }

  return (
    <div className="h-full absolute">
      <nav className="flex gap-2 bg-black bg-opacity-50 p-4">
        <NavLink to="/meeples">meeples</NavLink>
        <NavLink to="/help">help</NavLink>
        <Button onClick={() => game?.resetZoom()}>reset zoom</Button>
      </nav>
      <Outlet context={{ game }} />
    </div>
  );
};
export default Root;
