import { Actor, Engine, vec } from "excalibur";
import { Meeple } from "./Meeple";

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
    Math.floor(Math.random() * game.drawWidth),
    Math.floor(Math.random() * game.drawHeight)
  );
}

/**
 * Returns an array of X many things
 */
export function arrayOfThings<Type>(number: number, expression: () => Type) {
  return [...Array(number)].map(expression);
}

/**
 * Type guard for converting Actors to our custom Actor called Meeple
 */
export const isMeeple = (shape: Actor): shape is Meeple =>
  shape instanceof Meeple;
