import { Color, vec } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple } from "./Meeple";
import { ReactNode } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { shuffle } from "./utils";
import { Game } from "./Game";
import { Station } from "./Station";

// sparkles
export class Ship extends Meeple {
  public destination: Station | null = null;

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
    // this.patrol();
  }

  public patrol(game: Game) {
    // this.actions.clearActions();
    // this.actions.repeatForever((ctx) => {
    //   console.log(ctx);
    // });
    //   this.actions.repeatForever((ctx) => {
    //     ctx.moveTo(100, 100, 100).delay(3000).moveTo(0, 100, 100).delay(3000);
    //   });
  }
}
