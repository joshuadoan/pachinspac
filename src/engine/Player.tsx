import { Actor, Color, vec } from "excalibur";

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(100, 100),
      width: 100,
      height: 100,
      color: Color.Magenta,
    });
  }

  onInitialize() {
    this.on("pointerup", () => {
      alert("yo");
    });
  }
}
