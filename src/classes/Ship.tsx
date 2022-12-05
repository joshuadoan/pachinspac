import { vec } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple, MeepleFlavor } from "./Meeple";
import { Station } from "./Station";
import { MeepleColors } from "../consts";

// sparkles
export class Ship extends Meeple {
  public destination: Station | null = null;
  public flavor: MeepleFlavor = "Ship";

  constructor() {
    super({
      pos: vec(100, 100),
      width: 5,
      height: 5,
      color: MeepleColors[Math.floor(Math.random() * MeepleColors.length)],
      name: randomName("", " "),
    });
  }

  onInitialize() {
    this.on("pointerup", () => {
      alert("yo");
    });
  }
}
