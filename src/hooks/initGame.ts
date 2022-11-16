import { Timer } from "excalibur";
import { Game } from "../engine/Game";
import { Ship } from "../engine/Ship";
import { Station } from "../engine/Station";
import {
  arrayOfThings,
  flyToRandomStation,
  getRandomScreenPosition,
} from "../utils/utils";

export function init(game: Game) {
  let stations = arrayOfThings<Station>(10, () => new Station());

  stations.forEach(function (station) {
    station.pos = getRandomScreenPosition(game);
    game.add(station);
  });

  let ships = arrayOfThings<Ship>(50, () => new Ship());

  ships.forEach(function (ship) {
    ship.pos = getRandomScreenPosition(game);

    game.add(ship);

    let timer = new Timer({
      fcn: () => flyToRandomStation(ship, stations),
      repeats: true,
      interval: 1000,
    });
    game.add(timer);
    timer.start();
  });
}
