import { Destination } from "../classes/destination";
import { Game } from "../classes/game";
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
