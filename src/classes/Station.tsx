import { Color, vec, Text, Font, Engine, Label, FontUnit } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple } from "./Meeple";
import { Game } from "./Game";

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

  onInitialize(game: Game): void {
    const label = new Label({
      name: "name",
      text: this.name,
      pos: vec(this.width + 10, 3),
      font: new Font({
        family: "verdana",
        size: 1,
        unit: FontUnit.Rem,
        color: Color.Orange,
      }),
    });

    this.addChild(label);

    label.on("pointerdown", (e) => {
      console.log("____");
    });
  }
}
