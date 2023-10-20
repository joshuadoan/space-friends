import { Camera, Vector } from "excalibur";

const MIN_ZOOM = 0.5;

export function zoomOutToPoint(camera: Camera, vec: Vector) {
  camera.clearAllStrategies();
  camera.strategy.camera.move(vec, 1000);
  camera.strategy.camera.zoomOverTime(MIN_ZOOM, 1000);
}
