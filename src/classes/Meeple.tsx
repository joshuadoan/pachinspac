import { Actor } from "excalibur";
import { getChat } from "../routines/getChat";
import { Station } from "./Station";

export type Role = "Unknown" | "Trader" | "Station" | "Maintenance";
export type ShipStatus = "Idle" | "Traveling" | "Visiting" | "Stranded";
export type StationStatus = "Closed" | "Open";
export type MaintenanceStatus = "Idle" | "Repairing";
export type MeepleStatus = ShipStatus | StationStatus | MaintenanceStatus;

export class Meeple extends Actor {
  public health: number = 100;
  public selected: boolean = false;

  public attributes: {
    status: MeepleStatus;
    destination: Meeple | null;
    health: number;
    selected: boolean;
    visitors: {
      [key: string]: Meeple | null;
    };
    chat: string[];
    role: string;
    log: {
      date: string;
      message: string;
    }[];
  } = {
    destination: null,
    health: 100,
    selected: false,
    status: "Idle",
    visitors: {},
    chat: [],
    role: "Unknown",
    log: [],
  };

  public trade(stations: Station[]) {
    this.actions.repeatForever((actions) => {
      let station = stations[Math.floor(Math.random() * stations.length)];

      this.attributes.status = "Traveling";
      this.attributes.destination = station;
      // let { chat, punctuation } = getChat(this.id);

      actions
        .meet(this.attributes.destination, Math.floor(Math.random() * 100) + 50)
        .callMethod(() => {
          this.attributes.status = "Visiting";
          if (this.attributes.destination) {
            this.attributes.destination.attributes.visitors[this.id] = this;
          }
          // this.attributes.chat = [chat + punctuation];
        })
        .delay(10 * 1000)
        .callMethod(() => {
          if (this.attributes.destination) {
            this.attributes.destination.attributes.visitors[this.id] = null;
          }

          this.attributes.status = "Idle";
        });
    });
  }

  public repair() {
    this.actions.repeatForever((actions) => {
      let station = stations[Math.floor(Math.random() * stations.length)];

      this.actions.clearActions();
      this.attributes.status = "Traveling";
      this.attributes.destination = station;
      // let { chat, punctuation } = getChat(this.id);

      actions
        .meet(this.attributes.destination, Math.floor(Math.random() * 100) + 50)
        .callMethod(() => {
          this.attributes.status = "Visiting";
          if (this.attributes.destination) {
            this.attributes.destination.attributes.visitors[this.id] = this;
          }
          // this.attributes.chat = [chat + punctuation];
        })
        .delay(10 * 1000)
        .callMethod(() => {
          if (this.attributes.destination) {
            this.attributes.destination.attributes.visitors[this.id] = null;
          }

          this.attributes.status = "Idle";
        });
    });
  }
}
