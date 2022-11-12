import { Actor, Color, DisplayMode, Engine, vec } from "excalibur";
import { arrayOfThings, getRandomScreenPosition, shuffle } from "./utils";
import { Ship } from "./Ship";
import { Station } from "./Station";

export class Game extends Engine {
  constructor() {
    super({
      displayMode: DisplayMode.FillContainer,
      backgroundColor: Color.Black,
      canvasElementId: "pepper",
    });
  }
  initialize() {
    const stations = arrayOfThings<Station>(10, () => new Station());

    stations.forEach((station) => {
      station.pos = getRandomScreenPosition(this);
      this.add(station);
    });

    [...Array(20)].forEach(() => {
      const ship = new Ship();

      ship.pos = vec(
        Math.floor(Math.random() * this.drawWidth),
        Math.floor(Math.random() * this.drawHeight)
      );

      let colors = [
        Color.Azure,
        Color.Chartreuse,
        Color.ExcaliburBlue,
        Color.Vermilion,
      ];

      ship.color = colors[Math.floor(Math.random() * colors.length)];

      ship.actions.repeatForever(() => {
        shuffle(stations).forEach((station) => {
          ship.actions
            .meet(station, Math.floor(Math.random() * 100) + 10)
            .delay(1000);
        });
      });

      this.add(ship);
    });
  }
}
