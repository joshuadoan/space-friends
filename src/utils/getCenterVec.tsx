import { Engine, vec } from "excalibur";

export function getCenterVec(game: Engine) {
  let center = vec(
    (game.drawWidth / 2) * game.currentScene.camera.zoom,
    (game.drawHeight / 2) * game.currentScene.camera.zoom
  );

  return center;
}
