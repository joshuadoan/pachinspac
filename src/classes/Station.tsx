import { Color, vec } from "excalibur";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
} from "unique-names-generator";
import { Meeple } from "./Meeple";

export class Station extends Meeple {
  constructor() {
    let randomName = uniqueNamesGenerator({
      dictionaries: [
        ["The", "Ye", "Gr'Z"],
        [...adjectives, ...colors],
        [...animals],
      ],
      separator: " ",
      length: 3,
      style: "capital",
    });
    super({
      pos: vec(100, 100),
      width: 8,
      height: 8,
      color: Color.Orange,
      name: randomName,
    });
    this.attributes.role = "Station";
  }
}
