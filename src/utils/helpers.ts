import { Actor, Color, Engine, Vector, vec } from "excalibur";
import { getPersonName } from "./get-name";

/**
 * Returns a random integer between the given minimum and maximum values, inclusive.
 */
export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function distanceBetween(a: Vector, b: Vector) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
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

export function randomFromArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
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
