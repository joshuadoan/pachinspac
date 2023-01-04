import { useReducer } from "react";
import name from "@scaleway/random-name";

import { names, uniqueNamesGenerator } from "unique-names-generator";
import { createMachine, StateDefinition } from "../machines/createMachine";
import { Meeple } from "../classes/Meeple";
import { getRandomScreenPosition, isMeeple } from "../utils";
import { Game } from "../classes/Game";
import { MeepleColors } from "../consts";
import { useNavigate } from "react-router-dom";

export default function useShip() {
  let navigate = useNavigate();

  function createShip(game: Game) {
    let randomName = uniqueNamesGenerator({
      dictionaries: [names, [name("", " ")]],
      separator: " ",
      length: 2,
    });

    let ship = new Meeple({
      pos: getRandomScreenPosition(game),
      color: MeepleColors[Math.floor(Math.random() * MeepleColors.length)],
      name: randomName,
    });

    ship.on("pointerdown", () => navigate("/" + ship.id));
    return ship;
  }

  return {
    createShip,
  };
}
