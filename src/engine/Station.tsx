import { Color, vec } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple } from "./Meeple";
import { ReactNode } from "react";
import { WrenchIcon } from "@heroicons/react/24/solid";

export class Station extends Meeple {
  constructor() {
    super({
      pos: vec(100, 100),
      width: 10,
      height: 10,
      color: Color.Orange,
      name: randomName("The", " "),
    });
  }

  public icon: ReactNode = (<WrenchIcon className="h-6 w-6" />);

  onInitialize() {
    this.on("pointerup", () => {
      alert("yo");
    });
  }
}
