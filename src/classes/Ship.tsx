import { vec, Text, Font } from "excalibur";
import name from "@scaleway/random-name";
import { Meeple } from "./Meeple";
import { MeepleColors } from "../consts";
import { uniqueNamesGenerator, names } from "unique-names-generator";
export class Ship extends Meeple {
  constructor() {
    let size = Math.floor(Math.random() * 5) + 5; // big_red_donkey
    let randomName = uniqueNamesGenerator({
      dictionaries: [names, [name("", " ")]],
      separator: " ",
      length: 2,
    });
    super({
      pos: vec(100, 100),
      width: 5,
      height: 5,
      name: randomName,
      color: MeepleColors[Math.floor(Math.random() * MeepleColors.length)],
    });
  }
}
