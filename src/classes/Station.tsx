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
      text: this.name,
      pos: vec(15, this.height / 2),
      font: new Font({
        family: "impact",
        size: 16,
        unit: FontUnit.Px,
        color: Color.Orange,
      }),
    });

    this.addChild(label);
  }

  onPostUpdate(engine: Game): void {
    // if (engine.selected) {
    //   let text = new Text({
    //     text: this.name,
    //     font: new Font({ size: 16 }),
    //     color: this.color,
    //   });
    //   this.graphics.use(text);
    // } else {
    //   this.graphics.u
    // }
  }

  // onInitialize() {
  //   let text = new Text({
  //     text: this.name,
  //     font: new Font({ size: 16 }),
  //     color: this.color,
  //   });
  //   this.graphics.use(text);
  // }
}
