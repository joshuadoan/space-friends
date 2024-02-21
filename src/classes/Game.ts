import { Engine, vec } from "excalibur";
import { DEFAULT_ZOOM } from "./Meeple";
/**
 * Resets the zoom of the camera.
 */
class Game extends Engine {
  resetZoom() {
    const center = vec(
      (this.drawWidth / 2) * this.currentScene.camera.zoom,
      (this.drawHeight / 2) * this.currentScene.camera.zoom
    );

    const camera = this.currentScene.camera;
    camera.clearAllStrategies();
    camera.strategy.camera.move(center, 500);
    camera.strategy.camera.zoomOverTime(DEFAULT_ZOOM, 500);
  }
}
export default Game;
