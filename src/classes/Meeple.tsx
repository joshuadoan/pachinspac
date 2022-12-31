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
    date: string;
    message: string;
  }[] = [];

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
    this.role = "station";
  }

  public trade(stations: Meeple[]) {
    this.role = "trader";
    this.actions.repeatForever((actions) => {
      let station = stations[Math.floor(Math.random() * stations.length)];

      this.status = "traveling";
      this.destination = station;
      // let { chat, punctuation } = getChat(this.id);

      actions
        .meet(this.destination, Math.floor(Math.random() * 100) + 50)
        .callMethod(() => {
          this.status = "visiting";
          if (this.destination) {
            this.destination.visitors[this.id] = this;
            this.log.push({
              date: new Date().toString(),
              message: "Visited " + this.destination.name,
            });

            this.destination.log.push({
              date: new Date().toString(),
              message: "Visited by " + this.name,
            });
          }
        })
        .delay(10 * 1000)
        .callMethod(() => {
          if (this.destination) {
            this.destination.visitors[this.id] = null;
          }

          this.status = "Idle";
        });
    });
  }

  public repair(traders: Meeple[], stations: Meeple[]) {
    this.role = "repair";

    this.actions.repeatForever((actions) => {
      if (!actions.getQueue().isComplete()) return;

      let stranded = traders.find((ship) => ship.status === "stranded");

      if (!stranded || this.status === "repairing") {
        return;
      }

      stranded.log.push({
        date: new Date().toString(),
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
            date: new Date().toString(),
            message: "Repaired " + stranded.name,
          });
          stranded.trade(stations);
        });
    });
  }
}
