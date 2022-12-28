import { Camera } from "excalibur";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../classes/Game";
import { Meeple } from "../classes/Meeple";
import { getCenterVec, isMeeple } from "../utils";

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 1.2;

export default function useCamera() {
  function zoomToSelected(meeple: Meeple, game: Game | null) {
    if (!game) return;
    game.currentScene.camera.clearAllStrategies();
    game.currentScene.camera.strategy.elasticToActor(meeple, 0.3, 0.3);
    game.currentScene.camera.strategy.camera.zoomOverTime(MAX_ZOOM, 1000);
  }

  function zoomOutAndCenter(game: Game | null) {
    if (!game) return;

    game.currentScene.camera.clearAllStrategies();

    let center = getCenterVec(game);
    game.currentScene.camera.strategy.camera.move(center, 1000);
    game.currentScene.camera.strategy.camera.zoomOverTime(MIN_ZOOM, 1000);
  }

  function initCamera(game: Game | null) {
    if (!game) return;

    let center = getCenterVec(game);
    game.currentScene.camera.strategy.camera.zoom = MIN_ZOOM;
    game.currentScene.camera.strategy.camera.move(center, 0);
  }

  return {
    initCamera,
    zoomToSelected,
    zoomOutAndCenter,
  };
}
