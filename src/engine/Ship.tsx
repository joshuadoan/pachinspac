import { Color, vec } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple } from "./Meeple";
import { ReactNode } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

// sparkles
export class Ship extends Meeple {
  constructor() {
    super({
      pos: vec(100, 100),
      width: 10,
      height: 10,
      color: Color.Magenta,
      name: randomName("", " "),
    });
  }

  public icon: ReactNode = (<PaperAirplaneIcon className="h-6 w-6" />);

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
