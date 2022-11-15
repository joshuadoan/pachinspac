import { Color, DisplayMode, Engine, Timer, vec } from "excalibur";
import { arrayOfThings, getRandomScreenPosition, isMeeple } from "./utils";
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
    let stations = arrayOfThings<Station>(10, () => new Station());

    stations.forEach((station) => {
      station.pos = getRandomScreenPosition(this);
      this.add(station);
    });

    let ships = arrayOfThings<Ship>(100, () => new Ship());

    ships.forEach((ship) => {
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
      let timer = new Timer({
        fcn: () => {
          let d = 0;
          // let station = stations.reduce(function (
          //   previousValue: Station,
          //   currentValue: Station
          // ) {
          //   let a = ship.pos.x - currentValue.pos.x;
          //   let b = ship.pos.y - currentValue.pos.y;

          //   let distance = Math.sqrt(a * a + b * b);

          //   let destination = distance > d ? currentValue : previousValue;
          //   d = distance;
          //   return destination;
          // });

          let rando = stations[Math.floor(Math.random() * stations.length)];

          ship.actions
            .meet(rando, Math.floor(Math.random() * 100) + 50)
            .delay(1000);
        },
        repeats: true,
        interval: 1000,
      });

      this.add(ship);
      this.add(timer);
      timer.start();

      // ship.patrol(this);
    });
  }
}
