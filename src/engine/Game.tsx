import { DisplayMode, Engine } from "excalibur";
import { Player } from "./Player";

export class Game extends Engine {
  constructor() {
    super({ displayMode: DisplayMode.FillContainer });
  }
  initialize() {
    const player = new Player();
    player.vel.x = 100;
    this.add(player);
  }
}
