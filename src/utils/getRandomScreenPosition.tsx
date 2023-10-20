import { Engine, vec } from "excalibur";

/**
 * Returns an excalibur vector at a random point on the canvas
 */

export function getRandomScreenPosition(game: Engine) {
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
