import { vec, Text, Font } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple } from "./Meeple";
import { MeepleColors } from "../consts";
export class Ship extends Meeple {
  constructor() {
    let size = Math.floor(Math.random() * 5) + 5;
    super({
      pos: vec(100, 100),
      width: size,
      height: size,
      name: randomName("", " "),
      color: MeepleColors[Math.floor(Math.random() * MeepleColors.length)],
    });
  }

  onInitialize() {
    console.log("INIT " + this.name);
  }
}
