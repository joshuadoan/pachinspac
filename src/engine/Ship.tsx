import { vec } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple, MeepleFlavor } from "./Meeple";
import { Station } from "./Station";
import { MeepleColors } from "../consts";

// sparkles
export class Ship extends Meeple {
  public destination: Station | null = null;
  public type: MeepleFlavor = "Ship";

  constructor() {
    super({
      pos: vec(100, 100),
      width: 10,
      height: 10,
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
