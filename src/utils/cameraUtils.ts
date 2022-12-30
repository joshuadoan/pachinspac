import { Camera, Vector } from "excalibur";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../classes/Game";
import { Meeple } from "../classes/Meeple";
import { getCenterVec, isMeeple } from "../utils";

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 1.2;
export function zoomToSelected(meeple: Meeple, camera: Camera) {
  camera.clearAllStrategies();
  camera.strategy.elasticToActor(meeple, 0.3, 0.3);
  camera.strategy.camera.zoomOverTime(MAX_ZOOM, 1000);
}

export function zoomOutToPoint(camera: Camera, vec: Vector) {
  camera.clearAllStrategies();
  camera.strategy.camera.move(vec, 1000);
  camera.strategy.camera.zoomOverTime(MIN_ZOOM, 1000);
}

// export function initCamera(game: Game | null) {
//   if (!game) return;

//   let center = getCenterVec(game);
//   game.currentScene.camera.strategy.camera.zoom = MIN_ZOOM;
//   game.currentScene.camera.strategy.camera.move(center, 0);
// }
