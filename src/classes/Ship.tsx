import { vec, Text, Font } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple, MeepleFlavor } from "./Meeple";
import { Station } from "./Station";
import { MeepleColors } from "../consts";
export class Ship extends Meeple {
  public destination: Station | null = null;
  public visiting: Station | null = null;

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
