import { Actor, Camera, Vector } from "excalibur";

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 1.2;
export function zoomToSelected(meeple: Actor, camera: Camera) {
  camera.clearAllStrategies();
  camera.strategy.elasticToActor(meeple, 0.3, 0.3);
  camera.strategy.camera.zoomOverTime(MAX_ZOOM, 1000);
}

export function zoomOutToPoint(camera: Camera, vec: Vector) {
  camera.clearAllStrategies();
  camera.strategy.camera.move(vec, 1000);
  camera.strategy.camera.zoomOverTime(MIN_ZOOM, 1000);
}
