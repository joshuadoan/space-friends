import React from "react";
import {
  NUMBER_OF_STARS,
  NUMBER_OF_STATIONS,
  ENGINE_DEFAULTS,
  NUMBER_OF_SHIPS,
} from "../consts";

import { makeStar } from "../utils/helpers";
import { Destination } from "../classes/destination";
import { Ship } from "../classes/ship";
import { Game } from "../classes/game";

export default function useGame() {
  const [game, setGame] = React.useState<Game | null>(null);

  React.useEffect(function initGame() {
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
    game.start();

    setGame(game);
  }, []);

  return game;
}
