import {
  Color,
  vec,
  Text,
  Font,
  FontUnit,
  Actor,
  CollisionType,
} from "excalibur";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
} from "unique-names-generator";
import { getRandomScreenPosition } from "../utils";
import { Game } from "./Game";
import { Meeple } from "./Meeple";

export class Station extends Meeple {
  constructor() {
    super({
      pos: vec(100, 100),
      width: 8,
      height: 8,
      color: Color.Orange,
      name: stationName(),
    });
  }

  public onInitialize(game: Game) {
    this.pos = getRandomScreenPosition(game);

    this.attributes = {
      ...this.attributes,
      role: "Station",
      status: "Open",
    };

    let text = new Text({
      text: this.name,
      font: new Font({
        family: "verdana",
        size: 1,
        unit: FontUnit.Rem,
        color: Color.Orange,
      }),
    });

    const actor = new Actor({
      pos: vec(0, -10),
      collisionType: CollisionType.Active,
      width: text.width,
      height: text.height,
    });

    actor.graphics.use(text);
    this.addChild(actor);
  }
}

function stationName() {
  return uniqueNamesGenerator({
    dictionaries: [
      ["The", "Ye", "Gr'Z"],
      [...adjectives, ...colors],
      [...animals],
    ],
    separator: " ",
    length: 3,
    style: "capital",
  });
}
