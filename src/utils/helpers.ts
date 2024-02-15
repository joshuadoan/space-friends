import { Actor, Color, Engine, vec } from "excalibur";
import { getPersonName } from "./get-name";
import { Destination } from "../classes/base";

/**
 * Returns a random integer between the given minimum and maximum values, inclusive.
 */
export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Creates a new star actor with a random position on the screen.
 */
export function makeStar(game: Engine) {
  const star = new Actor({
    name: `star-${getPersonName()}`,
    width: 1,
    height: 1,
    color: Color.DarkGray,
  });

  star.pos = getRandomScreenPosition(game);
  return star;
}

/**
 * Returns a random position on the screen.
 */
function getRandomScreenPosition(game: Engine) {
  let maxX = game.drawWidth - game.drawWidth * 0.1;
  let maxY = game.drawHeight - game.drawHeight * 0.1;
  let minY = game.drawHeight * 0.1;
  let minX = game.drawWidth * 0.1;

  return vec(
    Math.floor(Math.random() * (maxX - minX) + minX) *
      game.currentScene.camera.zoom,
    Math.floor(Math.random() * (maxY - minY) + minY) *
      game.currentScene.camera.zoom
  );
}

/**
 * Returns a random element from an array.
 */
export function getRandomDestination(actors: Destination[]) {
  return actors[Math.floor(Math.random() * actors.length)];
}
