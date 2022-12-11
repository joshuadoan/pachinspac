import { vec, Text, Font } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple, MeepleFlavor } from "./Meeple";
import { Station } from "./Station";
import { MeepleColors } from "../consts";

// sparkles
export class Ship extends Meeple {
  public destination: Station | null = null;
  public visiting: Station | null = null;

  constructor() {
    super({
      pos: vec(100, 100),
      width: 5,
      height: 5,
      name: randomName("", " "),
      color: MeepleColors[Math.floor(Math.random() * MeepleColors.length)],
    });
  }

  onInitialize() {
    console.log("INIT " + this.name);
  }
}
