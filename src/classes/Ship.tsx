import { vec, Text, Font, Color } from "excalibur";
import name from "@scaleway/random-name";
import { Meeple } from "./Meeple";
import { MeepleColors } from "../consts";
import { uniqueNamesGenerator, names } from "unique-names-generator";
export class Ship extends Meeple {
  constructor() {
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

    this.attributes.role = "Trader";
  }
}

export class Maintenance extends Meeple {
  constructor() {
    super({
      pos: vec(100, 100),
      width: 10,
      height: 5,
      name: "Repair Drone Dave",
      color: Color.Yellow,
    });

    this.attributes.role = "Maintenance";
  }
}
