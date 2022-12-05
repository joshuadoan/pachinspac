import { Color, vec } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple } from "./Meeple";

export class Station extends Meeple {
  public visitors: {
    [key: string]: Meeple | null;
  } = {};

  constructor() {
    super({
      pos: vec(100, 100),
      width: 10,
      height: 10,
      color: Color.Orange,
      name: randomName("The", " "),
    });
  }

  onInitialize() {
    this.on("pointerup", () => {
      alert("yo");
    });
  }
}