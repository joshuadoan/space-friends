import { Engine, vec, Vector } from "excalibur";
import { DEFAULT_ZOOM } from "./Meeple";
import { Direction } from "../types";
/**
 * Resets the zoom of the camera.
 */
class Game extends Engine {
  panTo(pos: Vector) {
    this.currentScene.camera.move(pos, 1000);
  }
  resetZoom() {
    this.zoomOut();
    const center = vec(
      (this.drawWidth / 2) * this.currentScene.camera.zoom,
      (this.drawHeight / 2) * this.currentScene.camera.zoom
    );
    const camera = this.currentScene.camera;
    camera.clearAllStrategies();
    camera.strategy.camera.move(center, 500);
  }
  zoomOut() {
    const camera = this.currentScene.camera;
    camera.strategy.camera.zoomOverTime(DEFAULT_ZOOM, 500);
  }
  panCamera(direction: Direction) {
    const { camera } = this.currentScene;
    camera.clearAllStrategies();

    switch (direction) {
      case Direction.Up:
        camera.move(vec(camera.pos.x, camera.pos.y - 20), 100);
        break;
      case Direction.Down:
        camera.move(vec(camera.pos.x, camera.pos.y + 20), 100);
        break;
      case Direction.Left:
        camera.move(vec(camera.pos.x - 20, camera.pos.y), 100);
        break;
      case Direction.Right:
        camera.move(vec(camera.pos.x + 20, camera.pos.y), 100);
        break;
    }
  }
}
export default Game;