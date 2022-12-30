import { Actor, Engine, vec } from "excalibur";
import { Game } from "./classes/Game";
import { Meeple } from "./classes/Meeple";
import { Ship } from "./classes/Ship";
import { Station } from "./classes/Station";
import { Filters } from "./types";

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
  return vec(
    Math.floor(Math.random() * game.drawWidth) * game.currentScene.camera.zoom,
    Math.floor(Math.random() * game.drawHeight) * game.currentScene.camera.zoom
  );
}

/**
 * Returns an array of X many things
 */
export function arrayOfThings<Type>(number: number, expression: () => Type) {
  return [...Array(number)].map(expression);
}

/**
 * Type guard for converting Actors into our custom Actor called Meeple
 */
export const isMeeple = (shape: Actor): shape is Meeple =>
  shape instanceof Meeple;

/**
 * Type guard for converting Meeple into a subclass
 */
export const isShip = (shape: Meeple): shape is Ship => shape instanceof Ship;

/**
 * Type guard for converting Meeple into a subclass
 */
export const isStation = (shape: Meeple): shape is Station =>
  shape instanceof Station;

export function randomChance() {
  let random = Math.random();
  return random < 0.01 ? true : false;
}

export function bySelectedFilters(filters: Filters, meeple: Meeple) {
  if (filters.ships && isShip(meeple)) {
    return true;
  }
  if (filters.stations && isStation(meeple)) {
    return true;
  }
  return false;
}

export function getCenterVec(game: Game) {
  let center = vec(
    (game.drawWidth / 2) * game.currentScene.camera.zoom,
    (game.drawHeight / 2) * game.currentScene.camera.zoom
  );

  return center;
}
