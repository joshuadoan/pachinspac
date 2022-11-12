import { Actor, Color, vec } from "excalibur";
import randomName from "@scaleway/random-name";

export class Ship extends Actor {
  constructor() {
    super({
      pos: vec(100, 100),
      width: 10,
      height: 10,
      color: Color.Magenta,
      name: randomName("", " "),
    });
  }

  onInitialize() {
    this.on("pointerup", () => {
      alert("yo");
    });
  }

  public patrol() {
    // clear existing queue
    this.actions.clearActions();
    // guard a choke point
    // move to 100, 100 and take 1.2s
    // wait for 3s
    // move back to 0, 100 and take 1.2s
    // wait for 3s
    // repeat
    this.actions.repeatForever((ctx) => {
      ctx.moveTo(100, 100, 100).delay(3000).moveTo(0, 100, 100).delay(3000);
    });
  }
}
