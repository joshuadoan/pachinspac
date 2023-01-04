import {
  Actor,
  Color,
  vec,
  Vector,
  Text,
  Font,
  FontUnit,
  CollisionType,
  Engine,
} from "excalibur";
import { createMachine, StateDefinition } from "../machines/createMachine";
import { randomChance } from "../utils";
import { randomName } from "./randomName";
export type Role = "Unknown" | "Trader" | "Station" | "Maintenance";
export type ShipStatus = "Idle" | "Traveling" | "Visiting" | "Stranded";
export type StationStatus = "Closed" | "Open";
export type MaintenanceStatus = "Idle" | "Repairing";
export type MeepleStatus = ShipStatus | StationStatus | MaintenanceStatus;

type MeepleOptions = {
  pos?: Vector;
  width?: number;
  height?: number;
  color?: Color;
  name?: string;
};

export type ShipState = "off" | "idle" | "moving" | "broken" | "calibrating";
export type ShipEvent = "start" | "stop" | "move" | "calibrate" | "break";

let definition: StateDefinition<ShipState, ShipEvent> = {
  idle: {
    break: "broken",
    calibrate: "calibrating",
    stop: "off",
  },
  off: {
    start: "idle",
  },
  moving: {
    break: "broken",
    stop: "off",
  },
  calibrating: {
    move: "moving",
    stop: "off",
  },
  broken: {},
};

let machine = createMachine<ShipState, ShipEvent>(definition);

export class Meeple extends Actor {
  public health: number = 100;
  public selected: boolean = false;
  public destination: Meeple | null = null;
  public visitors: {
    [key: string]: Meeple | null;
  } = {};
  public status: string = "idle";
  public role: "trader" | "station" | "repair" = "trader";
  public showLabel: boolean = false;
  public log: {
    date: Date;
    message: string;
  }[] = [];

  private state: ShipState = "off";
  private dispatch = (event: ShipEvent) => {
    this.state = machine.dispatch(this.state, event);
  };

  constructor(options: MeepleOptions) {
    super({
      pos: vec(100, 100),
      width: 8,
      height: 8,
      color: Color.Blue,
      name: randomName(),
      ...options,
    });
  }

  public onPostUpdate(_engine: Engine, _delta: number): void {
    let label = this.children.find((c) => c.name === "label");
    if (!label) return;

    if (!this.showLabel) {
      label.active = false;
    } else {
      label.active = true;
    }
  }

  public vend() {
    this.status = "open";
    this.role = "station";
  }

  public trade(stations: Meeple[]) {
    this.role = "trader";
    this.actions.repeatForever((actions) => {
      let randomTime = Math.floor(Math.random() * 1);
      switch (this.state) {
        case "off": {
          actions.delay(randomTime).callMethod(() => this.dispatch("start"));
          return;
        }
        case "idle": {
          actions.delay(1000).callMethod(() => {
            this.dispatch("calibrate");
          });

          return;
        }
        case "calibrating": {
          let station = stations[Math.floor(Math.random() * stations.length)];
          this.destination = station;
          actions
            .delay(randomTime)
            .callMethod(() => this.dispatch("move"))
            .blink(500, 250, 3);
          return;
        }
        case "moving": {
          if (!this.destination) {
            actions.callMethod(() => this.dispatch("stop")).delay(randomTime);
            return;
          }

          let speed = Math.floor(Math.random() * 100) + 50;

          actions
            .meet(this.destination, speed)
            .delay(randomTime)
            .moveBy(
              vec(
                Math.floor(Math.random() * -5) + 5,
                Math.floor(Math.random() * -5) + 5
              ),
              speed
            )
            .delay(randomTime)
            .callMethod(() => this.dispatch("stop"));
          return;
        }
      }
    });
  }

  public repair(traders: Meeple[], stations: Meeple[]) {
    this.role = "repair";

    this.actions.repeatForever((actions) => {
      let stranded = traders.find((ship) => ship.state === "broken");

      if (!stranded || this.status === "repairing") {
        return;
      }

      stranded.log.push({
        date: new Date(),
        message: "Repaired by " + this.name,
      });

      this.status = "Repairing";
      this.destination = stranded;

      actions
        .blink(500, 250, 3)
        .meet(stranded, 100)
        .blink(500, 250, 3)
        .callMethod(() => {
          if (!stranded) {
            return;
          }

          this.log.push({
            date: new Date(),
            message: "Repaired " + stranded.name,
          });
          stranded.trade(stations);
        });
    });
  }

  public onInitialize() {
    let Label = new Text({
      text: this.name,
      font: new Font({
        family: "verdana",
        size: 1,
        unit: FontUnit.Rem,
        color: Color.Orange,
      }),
    });

    const actor = new Actor({
      name: "label",
      pos: vec(0, -10),
      collisionType: CollisionType.Active,
      width: Label.width,
      height: Label.height,
    });

    actor.graphics.use(Label);

    this.addChild(actor);
  }
}
