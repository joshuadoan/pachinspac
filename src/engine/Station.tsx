import { Actor, Color, vec } from "excalibur";
import randomName from "@scaleway/random-name";

export class Station extends Actor {
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
