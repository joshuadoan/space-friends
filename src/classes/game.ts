import { Engine, vec } from "excalibur";
import { MIN_ZOOM } from "../consts";

/**
 * Resets the zoom of the camera.
 */
export class Game extends Engine {
  resetZoom() {
    const center = vec(
      (this.drawWidth / 2) * this.currentScene.camera.zoom,
      (this.drawHeight / 2) * this.currentScene.camera.zoom
    );

    const camera = this.currentScene.camera;
    camera.clearAllStrategies();
    camera.strategy.camera.move(center, 1000);
    camera.strategy.camera.zoomOverTime(MIN_ZOOM, 1000);
  }
}
