import { Color, vec, Text, Font, Engine, Label, FontUnit } from "excalibur";
import randomName from "@scaleway/random-name";
import { Meeple } from "./Meeple";
import { Game } from "./Game";

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
}
