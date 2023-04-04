import { Engine, vec } from "excalibur";
import { Game } from "./classes/Game";

/**
 * Shuffles array
 */
export function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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

/**
 * Returns an array of X many things
 */
export function arrayOfThings<Type>(number: number, expression: () => Type) {
  return [...Array(number)].map(expression);
}

/**
 * Type guard for converting Meeple into a subclass
 */

export function randomChance(percent: number = 0.1) {
  let random = Math.random();
  return random < percent ? true : false;
}

export function getCenterVec(game: Game) {
  let center = vec(
    (game.drawWidth / 2) * game.currentScene.camera.zoom,
    (game.drawHeight / 2) * game.currentScene.camera.zoom
  );

  return center;
}
